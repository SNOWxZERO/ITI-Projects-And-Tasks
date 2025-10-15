using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class ProblemDto {
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("problem_statement")]
    public string ProblemStatment { get; set; }
    
    [JsonPropertyName("difficulty")]
    public int Difficulty { get; set; }
    
    [JsonPropertyName("tags")]
    public List<int> Tags { get; set; }
    
    [JsonPropertyName("time_limit_in_milliseconds")]
    public int TimeLimitInMilliSeconds { get; set; }
    
    [JsonPropertyName("memory_limit_in_kilobytes")]
    public int MemoryLimitInKiloBytes { get; set; }
    
    [JsonPropertyName("test_cases")]
    public List<BaseTestCaseDto> TestCases { get; set; }
}