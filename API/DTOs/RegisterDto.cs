using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]  // Important --> this is Validator it take place automaticly when request 
                    // is recived  (auto handle wrong data - we don't have to warry about this) it comes with [ApiContoller] 
                    // [EmailAddress]
                    // [MaxLength]
                    // [Phone]
                    // https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-6.0
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}