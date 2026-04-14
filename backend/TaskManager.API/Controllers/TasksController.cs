using Microsoft.AspNetCore.Mvc;
using TaskManager.API.Models;
using TaskManager.API.Services;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskItem>>> GetAll() =>
        Ok(await _taskService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetById(string id)
    {
        var task = await _taskService.GetByIdAsync(id);
        return task is null ? NotFound() : Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create(TaskItem task)
    {
        var created = await _taskService.CreateAsync(task);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, TaskItem task)
    {
        var existing = await _taskService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        task.Id = id;
        await _taskService.UpdateAsync(id, task);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _taskService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _taskService.DeleteAsync(id);
        return NoContent();
    }
}
