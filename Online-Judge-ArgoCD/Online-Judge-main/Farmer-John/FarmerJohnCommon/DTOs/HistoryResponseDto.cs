using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs;

public class HistoryResponseDto{
    [JsonPropertyName("problem_name")]

    public string ProblemName { get; set; }

    [JsonPropertyName("problem_id")]
    public int ProblemId { get; set; }
    
    [JsonPropertyName("verdict")]
    public string Verdict { get; set; }
    
    [JsonPropertyName("time_taken_in_milliseconds")]
    public int TimeTakenInMilliSeconds { get; set; }
    
    [JsonPropertyName("memory_taken_in_kilobytes")]
    public int MemoryTakenInKiloBytes { get; set; }
    
    [JsonPropertyName("language")]
    public string Language { get; set; }
    
    [JsonPropertyName("submission_date")]
    public DateTime SubmissionDate { get; set; }
}