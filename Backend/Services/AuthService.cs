using Backend.Data;
using Backend.Interfaces;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public Task Login()
        {
            throw new NotImplementedException();
        }

        public Task RefreshUserToken()
        {
            throw new NotImplementedException();
        }

        public Task RevokeUserToken()
        {
            throw new NotImplementedException();
        }
    }
}
