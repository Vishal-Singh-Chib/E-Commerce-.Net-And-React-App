namespace API.Entities
{
        public class Comment
        {
            public int Id { get; set; }
            public int PostId { get; set; }
            public string AuthorEmail { get; set; } = "";
            public string Text { get; set; } = "";
            public DateTime CreatedAt { get; set; } = DateTime.Now;

            public int? ParentCommentId { get; set; }
            public Comment? ParentComment { get; set; }
            public List<Comment> Replies { get; set; } = new();

            // Navigation
            public Post Post { get; set; } = null!;


    }

    public class CommentRequest
    {
        public int? ParentCommentId { get; set; }
        public string Text { get; set; } = "";
        public string AuthorEmail { get; set; } = "";
    }

}
