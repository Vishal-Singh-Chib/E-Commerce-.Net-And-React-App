using API.Data;
using API.TokenService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container
builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<TokenService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6")
            ),
            ValidateIssuer = false,
            ValidateAudience = false,
            NameClaimType = "email"
        };
    });

builder.Services.AddCors();

var app = builder.Build();

// 2. Apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<StoreContext>();
    db.Database.Migrate();
}

// 3. Configure the HTTP request pipeline
app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins(
            "https://localhost:3000",
            "https://localhost:3001",
            "https://socialplatformfortest.netlify.app/"
        );
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Optional: custom DB seeding
DbInitializer.InitDb(app);

app.Run();
