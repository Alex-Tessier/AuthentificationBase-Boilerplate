namespace Backend.Interfaces
{
    public interface IAuthService
    {
        Task Login();
        Task RefreshUserToken();
        Task RevokeUserToken();
    }
}
