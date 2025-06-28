using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost(Name = "Register")]
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

        [HttpPost(Name = "Update")]
        public IActionResult Update()
        {
            return Ok("User updated successfully.");
        }
    }
}
