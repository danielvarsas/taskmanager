using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskManager.API.Models;

namespace TaskManager.API.Services;

public class TaskService
{
    private readonly IMongoCollection<TaskItem> _tasks;

    public TaskService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _tasks = database.GetCollection<TaskItem>(settings.Value.CollectionName);
    }

    public async Task<List<TaskItem>> GetAllAsync() =>
        await _tasks.Find(_ => true).ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(string id) =>
        await _tasks.Find(t => t.Id == id).FirstOrDefaultAsync();

    public async Task<TaskItem> CreateAsync(TaskItem task)
    {
        await _tasks.InsertOneAsync(task);
        return task;
    }

    public async Task UpdateAsync(string id, TaskItem task) =>
        await _tasks.ReplaceOneAsync(t => t.Id == id, task);

    public async Task DeleteAsync(string id) =>
        await _tasks.DeleteOneAsync(t => t.Id == id);
}
