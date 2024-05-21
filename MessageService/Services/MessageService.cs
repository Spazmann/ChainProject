using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Quobject.SocketIoClientDotNet.Client;
using System.Collections.Generic;
using System.Threading.Tasks;

public class MessageService
{
    private readonly IMongoCollection<Message> _messagesCollection;
    private readonly ILogger<MessageService> _logger;
    private readonly Socket socket;

    public MessageService(
        ILogger<MessageService> logger,
        IOptions<MessageAPIDatabaseSettings> messageAPIDatabaseSettings,
        IOptions<SocketIOSettings> socketIOSettings)
    {
        _logger = logger;
        _logger.LogInformation("Using connection string: {ConnectionString}", messageAPIDatabaseSettings.Value.ConnectionString);

        var mongoClient = new MongoClient(messageAPIDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(messageAPIDatabaseSettings.Value.DatabaseName);
        _messagesCollection = mongoDatabase.GetCollection<Message>(messageAPIDatabaseSettings.Value.MessageCollectionName);

        socket = IO.Socket("localhost:3003");

        socket.On(Socket.EVENT_CONNECT, () =>
        {
            _logger.LogInformation("Connected to Socket.IO server");
        });

        socket.On(Socket.EVENT_DISCONNECT, () =>
        {
            _logger.LogInformation("Disconnected from Socket.IO server");
        });
    }

    public async Task<List<Message>> GetAsync() =>
        await _messagesCollection.Find(_ => true).ToListAsync();

    public async Task<Message?> GetAsync(string id) =>
        await _messagesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Message newMessage)
    {
        socket.Emit("message", newMessage.MessageContent);
        socket.Emit("messageCreated","Hello world");
        _logger.LogInformation("Emitted messageCreated event: {MessageContent}", newMessage.MessageContent);
        await _messagesCollection.InsertOneAsync(newMessage);
        _logger.LogInformation("Message created in MongoDB: {MessageContent}", newMessage.MessageContent);

       
    }

    public async Task UpdateAsync(string id, Message updatedMessage)
    {
        await _messagesCollection.ReplaceOneAsync(x => x.Id == id, updatedMessage);
        _logger.LogInformation("Message updated in MongoDB: {MessageContent}", updatedMessage.MessageContent);

        socket.Emit("messageUpdated", updatedMessage.MessageContent);
        _logger.LogInformation("Emitted messageUpdated event: {MessageContent}", updatedMessage.MessageContent);
    }

    public async Task RemoveAsync(string id)
    {
        await _messagesCollection.DeleteOneAsync(x => x.Id == id);
        _logger.LogInformation("Message removed from MongoDB: {MessageId}", id);

        socket.Emit("messageRemoved", id);
        _logger.LogInformation("Emitted messageRemoved event: {MessageId}", id);
    }
}
