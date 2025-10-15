using System.Text.Json.Serialization;
using FarmerJohnCommon.Enums;

namespace FarmerJohnCommon.DTOs; 

public class TonyRequestDto {
    [JsonPropertyName("code")]
    public string Code { get; set; }
    
    [JsonPropertyName("language")]
    public Language Language { get; set; }
    
    [JsonPropertyName("input")]
    public string Input { get; set; }
}