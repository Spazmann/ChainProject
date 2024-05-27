public class MessageAPIDatabaseSettings
{
    public string ConnectionString { get; set; } = "mongodb://mongo:27017";

    public string DatabaseName { get; set; } = "MessageDB";

    public string UserCollectionName { get; set; } = "users";
}