using Backend.Models;

namespace Backend.Interfaces
{
    public interface ITokenService
    {
        string GenetareJWTToken(User user);
        string GenerateRefreshToken();
        string RevokeRefreshToken();

    }
}
