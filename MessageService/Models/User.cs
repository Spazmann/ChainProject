using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId? _id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; }

    public string Email { get; set; } = null!;
}