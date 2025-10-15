using System.Text.Json.Serialization;
using FarmerJohnCommon.Enums;

namespace FarmerJohnCommon.DTOs; 

public class SubmissionResponseDto {
    [JsonPropertyName("verdict")]
    public string Verdict { get; set; }
    
    [JsonPropertyName("time_taken_in_milliseconds")]
    public int TimeTakenInMilliSeconds { get; set; }
    
    [JsonPropertyName("memory_taken_in_kilobytes")]
    public int MemoryTakenInKiloBytes { get; set; }
}