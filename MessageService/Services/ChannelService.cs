using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

public class ChannelService
{
    private readonly IMongoCollection<Channel> _channelsCollection;
    private readonly ILogger<ChannelService> _logger;

    public ChannelService(
        ILogger<ChannelService> logger,
        IOptions<ChannelAPIDatabaseSettings> channelAPIDatabaseSettings)
    {
        _logger = logger;

        var settings = channelAPIDatabaseSettings.Value;
        _logger.LogInformation("Using connection string: {ConnectionString}", settings.ConnectionString);

        var mongoClient = new MongoClient(settings.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.DatabaseName);
        _channelsCollection = mongoDatabase.GetCollection<Channel>(settings.ChannelCollectionName);

        _logger.LogInformation("ChannelService initialized with database: {DatabaseName} and collection: {CollectionName}", settings.DatabaseName, settings.ChannelCollectionName);
    }

    public async Task<List<Channel>> GetAsync()
    {
        _logger.LogInformation("Fetching all channels");
        return await _channelsCollection.Find(_ => true).ToListAsync();
    }

    public async Task<Channel?> GetAsync(string id)
    {
        _logger.LogInformation("Fetching channel with ID: {ChannelId}", id);
        return await _channelsCollection.Find(x => x.ChannelId == id).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(Channel newChannel)
    {
        _logger.LogInformation("Creating new channel with ID: {ChannelId}", newChannel.ChannelId);
        await _channelsCollection.InsertOneAsync(newChannel);
    }

    public async Task UpdateAsync(string id, Channel updatedChannel)
    {
        _logger.LogInformation("Updating channel with ID: {ChannelId}", id);
        await _channelsCollection.ReplaceOneAsync(x => x.ChannelId == id, updatedChannel);
    }

    public async Task RemoveAsync(string id)
    {
        _logger.LogInformation("Removing channel with ID: {ChannelId}", id);
        await _channelsCollection.DeleteOneAsync(x => x.ChannelId == id);
    }

     public async Task<List<Channel>> GetByUserIdAsync(string userId)
    {
        _logger.LogInformation("Fetching channels for user ID: {UserId}", userId);
        var filter = Builders<Channel>.Filter.ElemMatch(channel => channel.Users, user => user.Id == userId);
        var channels = await _channelsCollection.Find(filter).ToListAsync();
        _logger.LogInformation("Found {Count} channels for user ID: {UserId}", channels.Count, userId);
        return channels;
    }
}
