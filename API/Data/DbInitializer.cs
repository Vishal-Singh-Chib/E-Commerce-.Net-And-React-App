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

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new()
                {
          
                    Name = "Test",
                    Description = "Test",
                    Price = 2000,
                    PictureUrl = "/images/products/sb-core2",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {
        
                    Name = "Angular Speedster Board 2000",
                    Description = "High-performance board designed for Angular enthusiasts.",
                    Price = 2500,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 75
                },
                new()
                {
        
                    Name = "Green React Developer Board",
                    Description = "Eco-friendly developer board optimized for React.js workflows.",
                    Price = 1800,
                    PictureUrl = "/images/products/hat-react2.png",
                    Brand = "Reactify",
                    Type = "Boards",
                    QuantityInStock = 60
                },
                new()
                {
           
                    Name = "Vue Productivity Kit",
                    Description = "All-in-one kit to boost Vue.js application development.",
                    Price = 2100,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = "VueMaster",
                    Type = "Kits",
                    QuantityInStock = 50
                },
                new()
                {
           
                    Name = "Fullstack .NET Mega Board",
                    Description = "Powerful dev board for fullstack .NET developers.",
                    Price = 3000,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = ".NETify",
                    Type = "Boards",
                    QuantityInStock = 40
                },new()
                {

                    Name = "Test",
                    Description = "Test",
                    Price = 2000,
                    PictureUrl = "/images/products/sb-core2",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new()
                {

                    Name = "Angular Speedster Board 2000",
                    Description = "High-performance board designed for Angular enthusiasts.",
                    Price = 2500,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 75
                },
                new()
                {

                    Name = "Green React Developer Board",
                    Description = "Eco-friendly developer board optimized for React.js workflows.",
                    Price = 1800,
                    PictureUrl = "/images/products/hat-react2.png",
                    Brand = "Reactify",
                    Type = "Boards",
                    QuantityInStock = 60
                },
                new()
                {

                    Name = "Vue Productivity Kit",
                    Description = "All-in-one kit to boost Vue.js application development.",
                    Price = 2100,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = "VueMaster",
                    Type = "Kits",
                    QuantityInStock = 50
                },
                new()
                {

                    Name = "Fullstack .NET Mega Board",
                    Description = "Powerful dev board for fullstack .NET developers.",
                    Price = 3000,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Brand = ".NETify",
                    Type = "Boards",
                    QuantityInStock = 40
                }
            };
            context.Products.AddRange(products);
            context.SaveChanges();
        }

    }
}
