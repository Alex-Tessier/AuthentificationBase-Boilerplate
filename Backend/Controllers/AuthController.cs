using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost(Name = "Login")]
        public IActionResult Login()
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
