using System.ComponentModel.DataAnnotations;

namespace FarmerJohnDataAccessLayer.Models;

public class TestCaseModel {
    [Key] 
    public int TestCaseId { get; set; }
    
    public int ProblemId { get; set; }
    
    public string? Input { get; set; }
    
    public string? Output { get; set; }
    
    public bool IsHidden { get; set; }
    
    public bool IsSample { get; set; }
    
    public int Order { get; set; }
    
    public virtual ProblemModel Problem { get; set; }
}
