using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerData)
        {
            if (registerData == null)
                return BadRequest("No valid user data received.");

            User? newUser = await _userService.RegisterUser(registerData);

            if (newUser == null)
            {
                return BadRequest("User with the same username or email already exist.");
            }

            return Ok("User registered successfully.");
        }

        [HttpPost("Update")]
        public IActionResult Update()
        {
            return Ok("User updated successfully.");
        }
    }
}
