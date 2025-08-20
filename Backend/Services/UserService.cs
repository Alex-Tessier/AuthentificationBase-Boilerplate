using Backend.Data;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> RegisterUser(RegisterDto registeData)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == registeData.UserName || u.Email == registeData.Email))
            {
                return null;
            }

            var newUser = new User
            {
                UserName = registeData.UserName,
                Email = registeData.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registeData.Password) ,
                FirstName = registeData.FirstName,
                LastName = registeData.LastName
            };

            _context.Users.Add(newUser);

            await _context.SaveChangesAsync();

            return newUser;
        }
    }
}
