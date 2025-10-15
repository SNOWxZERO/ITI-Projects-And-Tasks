using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class RegisterRequestDto {
    
    [Required]
    [RegularExpression(@"^[^@]+$", ErrorMessage = "UserName must not contain '@' character.")]
    [JsonPropertyName("user_name")]
    public string UserName { get; set; }
    

    [Required]
    [JsonPropertyName("email")]
    public string Email { get; set; }

    [Required]
    [MinLength(8)]
    [JsonPropertyName("password")]
    public string Password { get; set; }
}