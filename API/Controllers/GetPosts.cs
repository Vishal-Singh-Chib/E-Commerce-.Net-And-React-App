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
    public class GetPostsController : ControllerBase
    {
        private readonly StoreContext _context;

        public GetPostsController(StoreContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            // Step 0: Identify current user
            var currentUserEmail = User.Claims.FirstOrDefault()?.Value;
            // or use from JWT, etc.

            // Step 1: Load all posts
            var posts = await _context.Posts.ToListAsync();

            // Step 2: Load all comments
            var allComments = await _context.Comments.ToListAsync();

            // Step 3: Load follows
            var followingEmails = await _context.UserFollows
                .Where(f => f.FollowerEmail == currentUserEmail)
                .Select(f => f.FolloweeEmail)
                .ToListAsync();

            // Step 4: Attach comments to each post
            var postResults = posts.Select(post =>
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
                    Comments = GetNestedComments(commentsForPost, rootComments),
                    IsFollowedUser = followingEmails.Contains(post.AuthorEmail)
                };
            });

            // Step 5: Order followed users first, then by date
            var sortedPosts = postResults
                .OrderByDescending(p => p.IsFollowedUser)
                .ThenByDescending(p => p.CreatedAt);

            return Ok(sortedPosts);
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
