using System.ComponentModel.DataAnnotations;
using FarmerJohnCommon.Enums;

namespace FarmerJohnDataAccessLayer.Models; 

public class SubmissionModel {
    [Key] 
    public int SubmissionId { get; set; }

    public DateTime SubmissionDate { get; set; }
    
    public int ProblemId { get; set; }
    
    public int UserId { get; set; }
    
    public string Code { get; set; }
    
    public Language Language { get; set; }
    
    public Verdict Verdict { get; set; }
    
    public int TimeTakenInMilliSeconds { get; set; }
    
    public int MemoryTakenInKiloBytes { get; set; }

    public virtual ProblemModel Problem { get; set; }
    
    public virtual UserModel User { get; set; }
}