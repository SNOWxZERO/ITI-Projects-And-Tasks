using System.Text.Json.Serialization;

namespace TonyCommon.DTOs;

public class SubmissionResponseDto{
    [JsonPropertyName("submission_id")] 
    public int SubmissionId { get; set; }
    
    [JsonPropertyName("time_taken_in_milli_seconds")] 
    public int TimeTakenInMilliSeconds { get; set; }
    
    [JsonPropertyName("memory_taken_in_kilo_bytes")]
    public int MemoryTakenInKiloBytes { get; set; }

    [JsonPropertyName("output")]
    public string? Output { get; set; }
    
    [JsonPropertyName("state")]
    public string State { get; set; }   
}