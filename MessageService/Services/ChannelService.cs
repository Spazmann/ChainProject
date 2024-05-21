using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Quobject.SocketIoClientDotNet.Client;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ChannelService
{
    private readonly IMongoCollection<Channel> _channelsCollection;
    private readonly ILogger<ChannelService> _logger;

    public ChannelService(
        ILogger<ChannelService> logger,
        IOptions<ChannelAPIDatabaseSettings> channelAPIDatabaseSettings)
    {
        _logger = logger;
        _logger.LogInformation("Using connection string: {ConnectionString}", channelAPIDatabaseSettings.Value.ConnectionString);

        var mongoClient = new MongoClient(channelAPIDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(channelAPIDatabaseSettings.Value.DatabaseName);
        _channelsCollection = mongoDatabase.GetCollection<Channel>(channelAPIDatabaseSettings.Value.ChannelCollectionName);
    }

    public async Task<List<Channel>> GetAsync() =>
        await _channelsCollection.Find(_ => true).ToListAsync();

    public async Task<Channel?> GetAsync(string id) =>
        await _channelsCollection.Find(x => x.ChannelId == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Channel newChannel)
    {
        await _channelsCollection.InsertOneAsync(newChannel);
    }

    public async Task UpdateAsync(string id, Channel updatedChannel)
    {
        await _channelsCollection.ReplaceOneAsync(x => x.ChannelId == id, updatedChannel);
    }

    public async Task RemoveAsync(string id)
    {
        await _channelsCollection.DeleteOneAsync(x => x.ChannelId == id);
    }
}
