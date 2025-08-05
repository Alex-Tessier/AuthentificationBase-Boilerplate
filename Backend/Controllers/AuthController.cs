using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService  )
        {
            _authService = authService;
            _tokenService = tokenService;
        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO loginData)
        {
            User user = await _authService.Login(loginData);
            
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            string jwtToken = _tokenService.GenetareJWTToken(user);

            return Ok(jwtToken);
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            return Ok("User Logout successfully.");
        }
    }
}
