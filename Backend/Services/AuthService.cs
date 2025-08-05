using Backend.Data;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthService(AppDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<User> Login(LoginDTO loginDTO)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginDTO.UserNameOrEmail || u.Email == loginDTO.UserNameOrEmail);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid username or password.");
            }

            string jwtToken = _tokenService.GenetareJWTToken(user);



            return jwtToken;
        }
    }
}
