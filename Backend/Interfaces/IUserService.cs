using Backend.Dtos;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterDto registeData);
        Task LoginUser();
        Task RefreshUserToken();
        Task RevokeUserToken();
    }
}
