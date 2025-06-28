using Backend.Data;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.EntityFrameworkCore; // Ajout de l'espace de noms requis pour AddDbContext  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.  
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi  
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.  
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
