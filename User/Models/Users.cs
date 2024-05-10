using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Users
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    
    public string username { get; set; } = null!;

    public string password { get; set; }

    public string email { get; set; } = null!;
}