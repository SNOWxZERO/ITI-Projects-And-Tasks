using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs;

public class BaseTestCaseResponseDto {
    [JsonPropertyName("input")]
    public string Input { get; set; }
    
    [JsonPropertyName("output")]
    public string Output { get; set; }
}