using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<Product>? Products { get; set; }
    }
}
