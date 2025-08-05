using System.Net;
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

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO loginData)
        {
            var result = await _authService.Login(loginData);

            if (!result.sucess)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, result.message); ;
            }

            return Ok(result.jwtToken);
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            return Ok("User Logout successfully.");
        }
    }
}
