using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
public class UserService{
    private readonly IMongoCollection<Users> _userCollection;
    private readonly ILogger<UserService> _logger;

    public UserService(ILogger<UserService> logger,IOptions<UserApiDatabase> userApiDatabase)
    {
        _logger = logger;
        _logger.LogInformation("Using connection string: {ConnectionString}", userApiDatabase.Value.ConnectionString);

        var mongoClient = new MongoClient(
            userApiDatabase.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            userApiDatabase.Value.DatabaseName);

        _messagesCollection = mongoDatabase.GetCollection<Message>(
            userApiDatabase.Value.MessageCollectionName);
    }

    public async Task<List<Users>> GetAsync() =>
        await _userCollection.Find(_ => true).ToListAsync();

    public async Task<Users?> GetAsync(string id) =>
        await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Users newUser) =>
        await _userCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, Users updatedUser) =>
        await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _userCollection.DeleteOneAsync(x => x.Id == id);
}