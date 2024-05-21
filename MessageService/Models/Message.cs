using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string username {get;set;}

    public string MessageContent { get; set; } = null!;

    public string Date { get; set; }

    public string ChannelID { get; set; } = null!;
}