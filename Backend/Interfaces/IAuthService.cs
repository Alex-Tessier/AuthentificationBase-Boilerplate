using Backend.Dtos;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IAuthService
    {
        Task<(bool sucess, string message, string? jwtToken)> Login(LoginDTO loginDTO);
    }
}
