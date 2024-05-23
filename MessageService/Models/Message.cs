using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Username { get; set; } = null!;

    public string MessageContent { get; set; } = null!;

    public string ReceivedUser { get; set; } = null!; // Changed to PascalCase to follow C# naming conventions

    public string Date { get; set; } = null!; // Added default initialization

    public string ChannelID { get; set; } = null!;
}
