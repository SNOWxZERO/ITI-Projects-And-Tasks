using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class LoginRequestDto {
    
    [Required]
    [JsonPropertyName("user_name")]
    public string UserName { get; set; }

    [Required]
    [JsonPropertyName("password")]
    public string Password { get; set; }
}