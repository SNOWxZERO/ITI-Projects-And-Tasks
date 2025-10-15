namespace TonyCommon.DTOs;

public class SubmissionResultDto{
    public string Output{ get; set; }
    public int TimeTakenInMilliSeconds{ get; set; }

    public int MemoryTakenInKiloBytes{ get; set; }
    public string Verdict{ get; set; }
}