using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Username { get; set; } = null!;

    public string MessageContent { get; set; } = null!;

    public string Date { get; set; } = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

    public string ChannelID { get; set; } = null!;
}