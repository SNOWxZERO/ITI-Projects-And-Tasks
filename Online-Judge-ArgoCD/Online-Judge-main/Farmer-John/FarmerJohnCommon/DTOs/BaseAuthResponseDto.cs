using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class BaseAuthResponseDto : BaseResponseDto{
    [JsonPropertyName("access_token")] 
    public string? AccessToken { get; set; }
}