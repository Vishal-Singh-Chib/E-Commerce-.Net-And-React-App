namespace API.Entities
{
    public class Content
    {
        // Post.cs
        public class Post
        {
            public int Id { get; set; }
            public string Content { get; set; } = "";
            public string AuthorEmail { get; set; } = "";
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public int Upvotes { get; set; }
            public int Downvotes { get; set; }
            public List<Comment> Comments { get; set; } = new();
        }

        public class commentRequest
        {
            public int? ParentCommentId { get; set; }
            public string Text { get; set; } = "";
            public string AuthorEmail { get; set; } = "";
        }

        public class Comment
        {
            public int Id { get; set; }
            public int PostId { get; set; }
            public string AuthorEmail { get; set; } = "";
            public string Text { get; set; } = "";
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

            public int? ParentCommentId { get; set; }
            public Comment? ParentComment { get; set; }
            public List<Comment> Replies { get; set; } = new();

            // Navigation
            public Post Post { get; set; } = null!;
        }


        // Follow.cs
        public class Follow
        {
            public int Id { get; set; }
            public string FollowerEmail { get; set; } = "";
            public string FollowingEmail { get; set; } = "";
        }

    }
}
