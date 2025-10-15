using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FarmerJohnDataAccessLayer.Models; 

public class TagModel {
    [Key]
    public int TagId { get; set; }
    public string Name { get; set; }
    [JsonIgnore]
    public ICollection<ProblemModel> Problems { get; set; }
}
