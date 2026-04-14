using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskManager.API.Models;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("status")]
    public string Status { get; set; } = "TODO"; // TODO | IN_PROGRESS | DONE

    [BsonElement("deadline")]
    public DateTime? Deadline { get; set; }
}
