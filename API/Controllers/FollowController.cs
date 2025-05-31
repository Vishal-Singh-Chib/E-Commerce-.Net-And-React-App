using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly StoreContext _context;

        public FollowController(StoreContext context) => _context = context;

        [HttpPost("followuser")]
        public async Task<IActionResult> Follow([FromBody] Entities.Unfollow.Follow dto)
        {
            if (dto.FollowerEmail == dto.FollowingEmail)
                return BadRequest("You cannot follow yourself.");

            var existing = await _context.UserFollows
                .FirstOrDefaultAsync(f => f.FollowerEmail == dto.FollowerEmail && f.FolloweeEmail == dto.FollowingEmail);

            if (existing != null)
            {
                _context.UserFollows.Remove(existing); // toggle unfollow
            }
            else
            {
                _context.UserFollows.Add(new UserFollow
                {
                    FollowerEmail = dto.FollowerEmail,
                    FolloweeEmail = dto.FollowingEmail
                });
            }

            await _context.SaveChangesAsync();
            return Ok();
        } 

    

    }
}
