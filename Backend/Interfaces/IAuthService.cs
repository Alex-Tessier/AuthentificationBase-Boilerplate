using Backend.Dtos;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IAuthService
    {
        Task<User> Login(LoginDTO loginDTO);
        Task RefreshUserToken();
        Task RevokeUserToken();
    }
}
