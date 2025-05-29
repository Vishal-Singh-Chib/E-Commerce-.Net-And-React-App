using API.Data;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static API.Entities.Content;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly StoreContext _context;

        public ContentController(StoreContext context) => _context = context;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Post post)
        {
            // Step 1: Add post
            _context.Posts.Add(post);
            await _context.SaveChangesAsync(); // post.Id is now populated

            return Ok(post);
        }


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
        [HttpPost("{id}/comment")]
        [Authorize]
        public async Task<IActionResult> Comment(int id, [FromBody] commentRequest dto)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound("Post not found.");

            var comment = new Comment
            {
                Text = dto.Text,
                AuthorEmail = dto.AuthorEmail, // Fallback if null
                PostId = id,
                CreatedAt = DateTime.UtcNow,
                ParentCommentId = null // Top-level comment
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }


        [HttpPost("comment/{parentCommentId}/reply")]
        [Authorize]
        public async Task<IActionResult> ReplyToComment([FromBody] commentRequest dto)
        {
            var parentComment = await _context.Comments.FindAsync(dto.ParentCommentId);
            if (parentComment == null) return NotFound("Parent comment not found.");

            var reply = new Comment
            {
                Text = dto.Text,
                AuthorEmail = dto.AuthorEmail,
                PostId =  parentComment.PostId, // Inherit post ID from parent
                ParentCommentId = dto.ParentCommentId
            };

            _context.Comments.Add(reply);
            await _context.SaveChangesAsync();

            return Ok(reply);
        }
        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            // Step 1: Load posts
            var posts = await _context.Posts.ToListAsync();

            // Step 2: Load all comments
            var allComments = await _context.Comments.ToListAsync();

            // Step 3: Attach comments to each post
            var result = posts.Select(post =>
            {
                var commentsForPost = allComments
                    .Where(c => c.PostId == post.Id)
                    .ToList();

                var rootComments = commentsForPost
                    .Where(c => c.ParentCommentId == null)
                    .ToList();

                return new
                {
                    post.Id,
                    post.Content,
                    post.AuthorEmail,
                    post.CreatedAt,
                    post.Upvotes,
                    post.Downvotes,
                    Comments = GetNestedComments(commentsForPost, rootComments)
                };
            });

            return Ok(result.OrderByDescending(post => post.CreatedAt));
        }

        private List<object> GetNestedComments(List<Comment> allComments, List<Comment> currentLevel)
        {
            return currentLevel.Select(comment => new
            {
                comment.Id,
                comment.Text,
                comment.AuthorEmail,
                comment.CreatedAt,
                Comments = GetNestedComments(
                    allComments,
                    allComments.Where(c => c.ParentCommentId == comment.Id).ToList()
                )
            }).ToList<object>();
        }



    }
}
