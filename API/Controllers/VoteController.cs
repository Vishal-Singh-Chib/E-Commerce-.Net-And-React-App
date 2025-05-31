using API.Data;
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
    public class VoteController : ControllerBase
    {
        private readonly StoreContext _context;

        public VoteController(StoreContext context) => _context = context;

        [HttpPost("{id}/vote")]
        [Authorize]
        public async Task<IActionResult> Vote(int id, [FromQuery] bool up)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound();

            if (up) post.Upvotes++;
            else post.Downvotes++;

            await _context.SaveChangesAsync();
            return Ok(post);
        }
    }
}
