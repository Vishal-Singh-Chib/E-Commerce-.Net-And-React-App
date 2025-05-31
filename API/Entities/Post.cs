
namespace API.Entities
{
        public class Post
        {
            public int Id { get; set; }
            public string Content { get; set; } = "";
            public string AuthorEmail { get; set; } = "";
            public DateTime CreatedAt { get; set; } = DateTime.Now;
            public int Upvotes { get; set; }
            public int Downvotes { get; set; }
            public List<Comment> Comments { get; set; } = new();
        }
    
}
