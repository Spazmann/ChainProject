using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class MessageService
{
    private readonly IMongoCollection<Message> _messagesCollection;
    private readonly ILogger<MessageService> _logger;

    public MessageService(
        ILogger<MessageService> logger,
        IOptions<MessageAPIDatabaseSettings> messageAPIDatabaseSettings)
    {
        _logger = logger;
        _logger.LogInformation("Using connection string: {ConnectionString}", messageAPIDatabaseSettings.Value.ConnectionString);

        var mongoClient = new MongoClient(
            messageAPIDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            messageAPIDatabaseSettings.Value.DatabaseName);

        _messagesCollection = mongoDatabase.GetCollection<Message>(
            messageAPIDatabaseSettings.Value.MessageCollectionName);
    }

    public async Task<List<Message>> GetAsync() =>
        await _messagesCollection.Find(_ => true).ToListAsync();

    public async Task<Message?> GetAsync(string id) =>
        await _messagesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Message newMessage) =>
        await _messagesCollection.InsertOneAsync(newMessage);

    public async Task UpdateAsync(string id, Message updatedMessage) =>
        await _messagesCollection.ReplaceOneAsync(x => x.Id == id, updatedMessage);

    public async Task RemoveAsync(string id) =>
        await _messagesCollection.DeleteOneAsync(x => x.Id == id);
}