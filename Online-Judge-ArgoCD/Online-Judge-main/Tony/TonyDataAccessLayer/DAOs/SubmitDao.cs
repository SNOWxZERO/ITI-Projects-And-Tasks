using TonyCommon.DTOs;
using TonyCommon.Enums;
using TonyDataAccessLayer.Models;
using TonyInfrastructureLayer.Handlers;

namespace TonyDataAccessLayer.DAOs;

public class SubmitDao : ISubmitDao{
    private readonly TonyDbContext _context;
    private readonly IWorker _worker;

    public SubmitDao(TonyDbContext context, IWorker worker){
        _context = context;
        _worker = worker;
    }

    public async Task<SubmissionResponseDto> AddSubmission(SubmissionRequestDto submissionRequestDto){
        var submissionResult = new SubmissionResponseDto();
        var newSubmission = new SubmissionModel{
            State = StateSubmission.Running,
            Code = submissionRequestDto.Code,
            Input = submissionRequestDto.Input,
            Language = submissionRequestDto.Language
        };
        var result =
            await _worker.SubmitCodeAsync(newSubmission.Input, newSubmission.Code, newSubmission.Language.ToString());
        string verdict = result.Verdict;
        if (verdict == "CompilationError"){
            newSubmission.State = StateSubmission.CompilationError;
            submissionResult.State = "CompilationError";
            submissionResult.Output = null;
            newSubmission.Output = null;
        }
        else if (verdict == "RuntimeError"){
            newSubmission.State = StateSubmission.RuntimeError;
            submissionResult.State = "RuntimeError";
            submissionResult.Output = null;
            newSubmission.Output = null;
        }
        else if (verdict == "TimeLimitExceeded"){
            newSubmission.State = StateSubmission.TimeLimitExceeded;
            submissionResult.State = "TimeLimitExceeded";
            submissionResult.Output = result.Output;
            newSubmission.Output = result.Output;
        }
        else if (verdict == "MemoryLimitExceeded"){
            newSubmission.State = StateSubmission.MemoryLimitExceeded;
            submissionResult.State = "MemoryLimitExceeded";
            submissionResult.Output = result.Output;
            newSubmission.Output = result.Output;
        }
        else{
            newSubmission.State = StateSubmission.Succeeded;
            submissionResult.State = "Succeeded";
            submissionResult.Output = result.Output;
            newSubmission.Output = result.Output;
        }

        newSubmission.TimeTakenInMilliSeconds = result.TimeTakenInMilliSeconds;
        submissionResult.TimeTakenInMilliSeconds = result.TimeTakenInMilliSeconds;
        newSubmission.MemoryTakenInKiloBytes = result.MemoryTakenInKiloBytes;
        submissionResult.MemoryTakenInKiloBytes = result.MemoryTakenInKiloBytes;
        _context.Submissions.Add(newSubmission);
        await _context.SaveChangesAsync();
        submissionResult.SubmissionId = newSubmission.SubmissionId;
        return submissionResult;
    }
}