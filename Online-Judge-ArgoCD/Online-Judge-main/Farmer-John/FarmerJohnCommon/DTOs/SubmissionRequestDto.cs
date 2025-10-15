using System.Text.Json.Serialization;
using FarmerJohnCommon.Enums;

namespace FarmerJohnCommon.DTOs; 

public class SubmissionRequestDto {
    [JsonPropertyName("problem_id")]
    public int ProblemId { get; set; }
    
    [JsonPropertyName("user_name")]
    public string UserName{ get; set; }
    
    [JsonPropertyName("language")]
    public Language Language { get; set; }
    
    [JsonPropertyName("code")]
    public string Code { get; set; }
}