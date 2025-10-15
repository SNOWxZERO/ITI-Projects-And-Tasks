using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class BaseResponseDto{
    [JsonPropertyName("response_description")]
    public string ResponseDescription { get; set; }
    
    [JsonPropertyName("response_code")]
    public string ResponseCode { get; set; }
    
}