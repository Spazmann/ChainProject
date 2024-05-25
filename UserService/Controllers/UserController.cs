using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService) =>
        _userService = userService;

    [HttpGet]
    public async Task<List<User>> Get() =>
        await _userService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<User>> GetByUsername(string username)
    {
        var user = await _userService.GetByUsernameAsync(username);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPost("multiple")]
    public async Task<ActionResult<List<User>>> GetMultipleByUsernames([FromBody] List<string> usernames)
    {
        if (usernames == null || usernames.Count == 0)
        {
            return BadRequest("Usernames are required");
        }

        var users = await _userService.GetByUsernamesAsync(usernames);
        return Ok(users);
    }

    [HttpGet("exists/{username}")]
    public async Task<IActionResult> DoesUserUsernameExist(string username)
    {
        var user = await _userService.GetByUsernameAsync(username);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(true);
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] User newUser)
    {
        if (newUser == null)
        {
            return BadRequest();
        }

        await _userService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        updatedUser.Id = user.Id;

        await _userService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _userService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        await _userService.RemoveAsync(id);

        return NoContent();
    }
}
