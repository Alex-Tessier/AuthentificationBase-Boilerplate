using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public record LoginDTO
    (
        [Required] string LoginIdentifier,
        [Required] string Password
    );
}
