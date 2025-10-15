using System.Text.Json.Serialization;
using TonyCommon.Enums;

namespace TonyCommon.DTOs; 
public class SubmissionRequestDto {
    [JsonPropertyName("code")] 
    public string Code { get; set; }
    
    [JsonPropertyName("language")]
    public Language Language { get; set; }
    
    [JsonPropertyName("input")] 
    public string Input { get; set; }
}