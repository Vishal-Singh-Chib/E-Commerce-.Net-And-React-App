using API.Data;
using API.Entities;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using static API.Entities.Unfollow;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnfollowController : ControllerBase
    {
        private readonly StoreContext _context;

        public UnfollowController(StoreContext context) => _context = context;
        // DELETE: Unfollow a user
        [HttpDelete("unfollowuser")]
        public async Task<IActionResult> Unfollow([FromBody] UserFollow model)
        {
            var follow = await _context.UserFollows.FirstOrDefaultAsync(f =>
                f.FollowerEmail == model.FollowerEmail &&
                f.FolloweeEmail == model.FolloweeEmail);

            if (follow == null)
                return NotFound("Follow relationship not found.");

            _context.UserFollows.Remove(follow);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Unfollowed successfully" });
        }
    }
}
