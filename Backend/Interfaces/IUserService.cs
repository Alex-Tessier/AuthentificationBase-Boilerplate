using Backend.Dtos;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterDto registeData);
    }
}
