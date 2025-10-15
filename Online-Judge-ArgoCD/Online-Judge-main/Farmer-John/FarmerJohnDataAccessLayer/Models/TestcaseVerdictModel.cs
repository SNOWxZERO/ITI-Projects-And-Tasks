using System.ComponentModel.DataAnnotations;
using FarmerJohnCommon.Enums;

namespace FarmerJohnDataAccessLayer.Models;

public class TestcaseVerdictModel {
    [Key]
    public int TestcaseVerdictId { get; set; }
    
    public int SubmissionId { get; set; }
    
    public int TestCaseId { get; set; }

    public string? Output { get; set; }
    
    public Verdict Verdict { get; set; }

    public int TimeTakenInMilliSeconds { get; set; }

    public int MemoryTakenInKiloBytes { get; set; }
    
    public virtual SubmissionModel Submission { get; set; }
    
    public virtual TestCaseModel TestCase { get; set; }
}