public class MessageAPIDatabaseSettings
{
    public string ConnectionString { get; set; } = "mongodb://host.docker.internal:27017";

    public string DatabaseName { get; set; } = "MessageDB";

    public string MessageCollectionName { get; set; } = "messages";
}