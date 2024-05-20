using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class MessageController : ControllerBase
{
    private readonly MessageService _messageService;

    public MessageController(MessageService messageService) =>
        _messageService = messageService;

    [HttpGet]
    public async Task<List<Message>> Get() =>
        await _messageService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Message>> Get(string id)
    {
        var message = await _messageService.GetAsync(id);

        if (message is null)
        {
            return NotFound();
        }

        return message;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody]Message newMessage)
    {
        await _messageService.CreateAsync(newMessage);

        return CreatedAtAction(nameof(Get), new { id = newMessage.Id }, newMessage);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Message updatedMessage)
    {
        var message = await _messageService.GetAsync(id);

        if (message is null)
        {
            return NotFound();
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
            return NotFound();
        }

        await _messageService.RemoveAsync(id);

        return NoContent();
    }
}
