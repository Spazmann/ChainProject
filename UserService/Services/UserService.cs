using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Quobject.SocketIoClientDotNet.Client;
using System.Collections.Generic;
using System.Threading.Tasks;

public class UserService
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly ILogger<UserService> _logger;

    public UserService(
        ILogger<UserService> logger,
        IOptions<MessageAPIDatabaseSettings> userAPIDatabaseSettings)
    {
        _logger = logger;
        _logger.LogInformation("Using connection string: {ConnectionString}", userAPIDatabaseSettings.Value.ConnectionString);

        var mongoClient = new MongoClient(userAPIDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(userAPIDatabaseSettings.Value.DatabaseName);
        _usersCollection = mongoDatabase.GetCollection<User>(userAPIDatabaseSettings.Value.UserCollectionName);
    }

    public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User newUser)
    {
        await _usersCollection.InsertOneAsync(newUser);
    }

    public async Task UpdateAsync(string id, User updatedUser)
    {
        await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);
    }

    public async Task RemoveAsync(string id)
    {
        await _usersCollection.DeleteOneAsync(x => x.Id == id);
    }
}
