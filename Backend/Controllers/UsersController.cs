using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost(Name = "Register")]
        public IActionResult Register()
        {
            return Ok("User registered successfully.");
        }

        [HttpPost(Name = "Update")]
        public IActionResult Update()
        {
            return Ok("User updated successfully.");
        }
    }
}
