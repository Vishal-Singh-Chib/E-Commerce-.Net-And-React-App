using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retreive conetxt.");
            SeedData(context);
        }

        private static void SeedData(StoreContext context)
        {
            context.Database.Migrate();

            if (context.Login.Any()) return;

           
            context.Login.AddRange();
            context.SaveChanges();
        }

    }
}
