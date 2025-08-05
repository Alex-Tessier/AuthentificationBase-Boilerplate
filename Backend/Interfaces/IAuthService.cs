using Backend.Dtos;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IAuthService
    {
        Task<string> Login(LoginDTO loginDTO);
    }
}
