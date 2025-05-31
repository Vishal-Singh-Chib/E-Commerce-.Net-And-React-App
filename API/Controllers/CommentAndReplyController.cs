using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentAndReplyController : ControllerBase
    {
        private readonly StoreContext _context;

        public CommentAndReplyController(StoreContext context) => _context = context;

        [HttpPost("{id}/comment")]
        [Authorize]
        public async Task<IActionResult> Comment(int id, [FromBody] CommentRequest dto)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound("Post not found.");

            var comment = new Comment
            {
                Text = dto.Text,
                AuthorEmail = dto.AuthorEmail, 
                PostId = id,
                CreatedAt = DateTime.Now,
                ParentCommentId = null 
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }


        [HttpPost("comment/{parentCommentId}/reply")]
        [Authorize]
        public async Task<IActionResult> ReplyToComment([FromBody] CommentRequest dto)
        {
            var parentComment = await _context.Comments.FindAsync(dto.ParentCommentId);
            if (parentComment == null) return NotFound("Parent comment not found.");

            var reply = new Comment
            {
                Text = dto.Text,
                AuthorEmail = dto.AuthorEmail,
                PostId =  parentComment.PostId, 
                ParentCommentId = dto.ParentCommentId
                 
            };

            _context.Comments.Add(reply);
            await _context.SaveChangesAsync();

            return Ok(reply);
        }

    }
}
