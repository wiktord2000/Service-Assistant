using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana")]
        [MinLength(6, ErrorMessage = "Nazwa użytkownika musi zawierać przynajmniej 6 znaków")]  
                                        // Important --> this is Validator it take place automaticly when request 
                                        // is recived  (auto handle wrong data - we don't have to warry about this) it comes with [ApiContoller] 
                                        // [EmailAddress]
                                        // [MaxLength]
                                        // [Phone]
                                        // https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-6.0
        public string Username { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane")]
        [MinLength(8, ErrorMessage = "Hasło musi zawierać przynajmniej 8 znaków")]
        public string Password { get; set; }
    }
}