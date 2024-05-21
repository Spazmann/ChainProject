public class MessageAPIDatabaseSettings
{
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";

    public string DatabaseName { get; set; } = "MessageDB";

    public string ChannelCollectionName { get; set; } = "channels";
}