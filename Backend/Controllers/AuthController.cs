using Backend.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost(Name = "Login")]
        public IActionResult Login(LoginDTO loginData)
        {
            return Ok("User Login successfully.");
        }

        [HttpPost(Name = "Logout")]
        public IActionResult Logout()
        {
            return Ok("User Logout successfully.");
        }
    }
}
