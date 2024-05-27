using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Channel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string ChannelId { get; set; } = ObjectId.GenerateNewId().ToString();

    public string ChannelName { get; set; } = null!;

    public List<User> Users { get; set; } = new List<User>();
}