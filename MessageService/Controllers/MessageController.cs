using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("[controller]")]
[EnableCors("AllowLocalhost3001")]
public class MessageController : ControllerBase
{
    private readonly MessageService _messageService;

    public MessageController(MessageService messageService) =>
        _messageService = messageService;
        
    [HttpGet]
    public async Task<List<Message>> Get() =>
        await _messageService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<List<Message>>> Get(string id)
    {
        var messages = await _messageService.GetMessagesByChannelIdAsync(id);

        if (messages == null || messages.Count == 0)
        {
            return NoContent();
        }

        return Ok(messages);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Message newMessage)
    {
        if (string.IsNullOrEmpty(newMessage.Date))
        {
            newMessage.Date = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
        }

        await _messageService.CreateAsync(newMessage);

        return CreatedAtAction(nameof(Get), new { id = newMessage.Id }, newMessage);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Message updatedMessage)
    {
        var message = await _messageService.GetAsync(id);

        if (message is null)
        {
            return NoContent();
        }

        updatedMessage.Id = message.Id;

        await _messageService.UpdateAsync(id, updatedMessage);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var message = await _messageService.GetAsync(id);

        if (message is null)
        {
            return NoContent();
        }

        await _messageService.RemoveAsync(id);

        return NoContent();
    }
}
