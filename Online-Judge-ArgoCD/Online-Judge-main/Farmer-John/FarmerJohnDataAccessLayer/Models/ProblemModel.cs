using System.ComponentModel.DataAnnotations;

namespace FarmerJohnDataAccessLayer.Models;

public class ProblemModel {
    [Key] public int ProblemId { get; set; }
    public string Name { get; set; }

    [Range(1, 7, ErrorMessage = "Difficulty must be between 1 and 7.")]
    public int Difficulty { get; set; }

    public int TimeLimitInMilliSeconds { get; set; }

    public int MemoryLimitInKiloBytes { get; set; }

    public string ProblemStatement { get; set; }

    public ICollection<TagModel> Tags { get; set; }

    public virtual ICollection<TestCaseModel> TestCases { get; set; }
}