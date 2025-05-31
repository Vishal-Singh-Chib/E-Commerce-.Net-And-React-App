namespace API.Entities
{
    public class UserFollow
    {
        public int Id { get; set; }
        public string FollowerEmail { get; set; } = string.Empty;
        public string FolloweeEmail { get; set; } = string.Empty;
    }

}