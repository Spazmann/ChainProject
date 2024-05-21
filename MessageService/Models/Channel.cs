using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Channel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? ChannelId { get; set; }

    public string ChannelName { get; set; } = null!;

    public User[] Users { get; set; }
}