using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    public string MessageContents { get; set; } = null!;

    public decimal Date { get; set; }

    public string Channel { get; set; } = null!;
}