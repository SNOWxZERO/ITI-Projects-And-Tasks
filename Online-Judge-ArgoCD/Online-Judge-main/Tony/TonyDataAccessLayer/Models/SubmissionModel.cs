using System.ComponentModel.DataAnnotations;
using TonyCommon.Enums;

namespace TonyDataAccessLayer.Models;



public class SubmissionModel {
    [Key] 
    public int SubmissionId { get; set; }

    public StateSubmission State { get; set; }
    
    public int TimeTakenInMilliSeconds { get; set; }

    public int MemoryTakenInKiloBytes { get; set; }

    public string Code { get; set; }
    
    public Language Language { get; set; }
    public string Input { get; set; }

    public string? Output { get; set; }
}