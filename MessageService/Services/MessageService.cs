using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;


public class MessageService
{
    private readonly IMongoCollection<Message> _messagesCollection;
    private readonly ILogger<MessageService> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly Socket _socket;
    private string basicUrl = "http://localhost:3007/message/";

    public MessageService(
        ILogger<MessageService> logger,
        IOptions<MessageAPIDatabaseSettings> messageAPIDatabaseSettings,
        IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;

        _logger.LogInformation("Using connection string: {ConnectionString}", messageAPIDatabaseSettings.Value.ConnectionString);

        var mongoClient = new MongoClient(messageAPIDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(messageAPIDatabaseSettings.Value.DatabaseName);
        _messagesCollection = mongoDatabase.GetCollection<Message>(messageAPIDatabaseSettings.Value.MessageCollectionName);

        // Initialize Socket.IO client
        _socket = IO.Socket("http://localhost:3003");
        _socket.On(Socket.EVENT_CONNECT, () => _logger.LogInformation("Connected to Socket.IO server"));
        _socket.On(Socket.EVENT_DISCONNECT, () => _logger.LogInformation("Disconnected from Socket.IO server"));
    }

    public async Task<List<Message>> GetAsync()
    {
        var messages = await _messagesCollection.Find(_ => true).ToListAsync();
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync(basicUrl);
        return new List<Message>(messages);
        
        
    }

        

    public async Task<Message?> GetAsync(string id)
    {
        return await _messagesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
        

    public async Task CreateAsync(Message newMessage)
    {
        try
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"{basicUrl}{newMessage.Username}/{newMessage.ReceivedUser}/{newMessage.MessageContent}");
            
            if (response.IsSuccessStatusCode)
            {
                await _messagesCollection.InsertOneAsync(newMessage);
                _logger.LogInformation("Message created in MongoDB: {MessageContent}", newMessage.MessageContent);
              }
            else
            {
                _logger.LogError("Failed to call external API. Status code: {StatusCode}", response.StatusCode);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating message");
        }
    }

    public async Task UpdateAsync(string id, Message updatedMessage)
    {
        try
        {
            await _messagesCollection.ReplaceOneAsync(x => x.Id == id, updatedMessage);
            _logger.LogInformation("Message updated in MongoDB: {MessageContent}", updatedMessage.MessageContent);

          }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating message");
        }
    }

    public async Task RemoveAsync(string id)
    {
        try
        {
            await _messagesCollection.DeleteOneAsync(x => x.Id == id);
            _logger.LogInformation("Message removed from MongoDB: {MessageId}", id);

            // Emit a message removal event via Socket.IO
            _socket.Emit("messageRemoved", id);
            _logger.LogInformation("Emitted messageRemoved event: {MessageId}", id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing message");
        }
    }
}
