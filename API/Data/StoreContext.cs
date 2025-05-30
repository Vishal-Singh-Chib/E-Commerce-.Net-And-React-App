using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using static API.Entities.Content;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        // Constructor to initialize the context with options
        public StoreContext(DbContextOptions<StoreContext> options)
            : base(options)
        {
        }

        // DbSet property for the Products table
        public DbSet<Login>? Login { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<UserFollow> UserFollows { get; set; }

    }
}
