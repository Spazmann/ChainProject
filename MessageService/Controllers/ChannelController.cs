using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ChannelController : ControllerBase
{
    private readonly ChannelService _channelService;

    public ChannelController(ChannelService channelService) =>
        _channelService = channelService;

    [HttpGet]
    public async Task<List<Channel>> Get() =>
        await _channelService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Channel>> Get(string id)
    {
        var channel = await _channelService.GetAsync(id);

        if (channel is null)
        {
            return NotFound();
        }

        return channel;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody]Channel newChannel)
    {
        await _channelService.CreateAsync(newChannel);

        return CreatedAtAction(nameof(Get), new { id = newChannel.ChannelId }, newChannel);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Channel updatedChannel)
    {
        var channel = await _channelService.GetAsync(id);

        if (channel is null)
        {
            return NotFound();
        }

        updatedChannel.ChannelId = channel.ChannelId;

        await _channelService.UpdateAsync(id, updatedChannel);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var channel = await _channelService.GetAsync(id);

        if (channel is null)
        {
            return NotFound();
        }

        await _channelService.RemoveAsync(id);

        return NoContent();
    }
}
