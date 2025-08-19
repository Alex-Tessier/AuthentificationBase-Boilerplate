using Backend.Dtos;
using Backend.Dtos.Auth;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IAuthService
    {
        Task<(bool success, string message, LoginResponseDTO? loginResponse)> Login(LoginDTO loginDTO);
        Task<(bool success, string message, LoginResponseDTO? loginResponse)> RefreshToken(string refreshToken);
    }
}
