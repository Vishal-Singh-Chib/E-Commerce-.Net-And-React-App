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
    public class PostController : ControllerBase
    {
        private readonly StoreContext _context;

        public PostController(StoreContext context) => _context = context;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Post post)
        {
            // Step 1: Add post
            _context.Posts.Add(post);
            await _context.SaveChangesAsync(); // post.Id is now populated

            return Ok(post);
        }

    }
}
