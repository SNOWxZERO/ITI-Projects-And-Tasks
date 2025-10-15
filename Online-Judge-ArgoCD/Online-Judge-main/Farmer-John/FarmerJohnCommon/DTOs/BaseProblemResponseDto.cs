using System.Text.Json.Serialization;

namespace FarmerJohnCommon.DTOs; 

public class BaseProblemResponseDto {
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("difficulty")]
    public int Difficulty { get; set; }
    
    [JsonPropertyName("tags")]
    public List<int> Tags { get; set; }
}