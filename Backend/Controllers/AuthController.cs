using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO loginData)
        {
            if (await _authService.Login(loginData) == null)
            {
                return BadRequest("No valid user data received.");
            }
            
            return Ok("User Login successfully.");
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            return Ok("User Logout successfully.");
        }
    }
}
