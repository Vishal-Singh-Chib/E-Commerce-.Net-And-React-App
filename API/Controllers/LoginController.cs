using API.Data;
using API.Entities;
using API.TokenService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

[ApiController]
[Route("api/[controller]")] // ✅ Enables routing to /api/login
public class LoginController : ControllerBase
{
    private readonly StoreContext _context;
    private readonly TokenService _tokenService;

    public LoginController(StoreContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost]
    public async Task<ActionResult<object>> RegisterOrLogin([FromBody] LoginDto loginDto)
    {
        var email = loginDto.Email.Trim().ToLower();

        if (!ModelState.IsValid)
            return BadRequest("Invalid email or password format.");

        var user = await _context.Login!.SingleOrDefaultAsync(x => x.Email == email);

        if (user != null)
        {
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Incorrect password");
            }

            return Ok(new
            {

                email = user.Email,
                token = _tokenService.CreateToken(user)
            });
        }

        // Check for duplicate email (again for race condition)
        if (await _context.Login!.AnyAsync(x => x.Email == email))
        {
            return Conflict("This email is already registered.");
        }

        using var registerHmac = new HMACSHA512();
        var newUser = new Login
        {
            Email = email,
            PasswordHash = registerHmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)),
            PasswordSalt = registerHmac.Key
        };

        _context.Login!.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            email = newUser.Email,
            token = _tokenService.CreateToken(newUser)
        });
    }
}