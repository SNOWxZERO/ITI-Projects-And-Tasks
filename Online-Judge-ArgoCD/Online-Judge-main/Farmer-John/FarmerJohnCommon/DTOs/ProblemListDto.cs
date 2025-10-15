using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class ProblemListDto : BaseResponseDto {
    [JsonPropertyName("problems")]
    public List<BaseProblemResponseDto> Problems { get; set; }
    
    [JsonPropertyName("total_count")]
    public int NumberOfProblems { get; set; }
}