namespace API.Entities
{
    public class Follow
    {
        public int Id { get; set; }
        public string FollowerEmail { get; set; } = "";
        public string FollowingEmail { get; set; } = "";

    }
}
