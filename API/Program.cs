using API.Data;
using API.TokenService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6")),
            ValidateIssuer = false,
            ValidateAudience = false,
            NameClaimType = "email"

        };
    });
builder.Services.AddCors();
var app = builder.Build();



app.UseAuthentication();
app.UseAuthorization();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000","https://localhost:3001", "https://social-platform-net-and-react-app-4.vercel.app/");
});
// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
