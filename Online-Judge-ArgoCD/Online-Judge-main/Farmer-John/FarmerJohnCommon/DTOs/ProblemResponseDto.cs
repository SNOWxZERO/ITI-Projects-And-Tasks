using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs;

public class ProblemResponseDto : ProblemDto {
    [JsonPropertyName("response_description")]
    public string ResponseDescription { get; set; }

    [JsonPropertyName("response_code")] 
    public string ResponseCode { get; set; }
    
    [JsonPropertyName("test_cases")]
    public List<BaseTestCaseResponseDto> TestCases { get; set; }

}