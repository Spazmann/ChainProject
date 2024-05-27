using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class ChannelController : ControllerBase
{
    private readonly ChannelService _channelService;
    private readonly ILogger<ChannelController> _logger;

    public ChannelController(ChannelService channelService, ILogger<ChannelController> logger)
    {
        _channelService = channelService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<List<Channel>> Get() =>
        await _channelService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Channel>> Get(string id)
    {
        var channel = await _channelService.GetAsync(id);

        if (channel is null)
        {
            _logger.LogWarning("Channel with ID: {ChannelId} not found.", id);
            return NoContent();
        }

        return channel;
    }

    [HttpGet("user/{userId:length(24)}")]
    public async Task<ActionResult<List<Channel>>> GetByUserId(string userId)
    {
        _logger.LogInformation("Fetching channels for user ID: {UserId}", userId);

        var channels = await _channelService.GetByUserIdAsync(userId);

        if (channels is null || channels.Count == 0)
        {
            _logger.LogWarning("No channels found for user ID: {UserId}", userId);
            return NoContent();
        }

        return channels;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Channel newChannel)
    {
        if (string.IsNullOrEmpty(newChannel.ChannelId))
        {
            newChannel.ChannelId = ObjectId.GenerateNewId().ToString();
        }

        await _channelService.CreateAsync(newChannel);

        return CreatedAtAction(nameof(Get), new { id = newChannel.ChannelId.ToString() }, newChannel);
    }


    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Channel updatedChannel)
    {
        var channel = await _channelService.GetAsync(id);

        if (channel is null)
        {
            return NoContent();
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
            return NoContent();
        }

        await _channelService.RemoveAsync(id);

        return NoContent();
    }
}
