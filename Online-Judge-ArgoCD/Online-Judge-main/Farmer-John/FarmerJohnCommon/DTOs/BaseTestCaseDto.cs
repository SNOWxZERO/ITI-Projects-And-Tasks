using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class BaseTestCaseDto : BaseTestCaseResponseDto{
    
    [JsonPropertyName("is_sample")]
    public bool IsSample { get; set; }
    
    [JsonPropertyName("is_hiden")]
    public bool IsHiden { get; set; }
}