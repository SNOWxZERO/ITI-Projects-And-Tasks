using TonyCommon.DTOs;
using TonyDataAccessLayer.DAOs;

namespace TonyBusinessLayer.Handlers;

public class SubmitHandler : ISubmitHandler{
    private readonly ISubmitDao _submitDao;

    public SubmitHandler(ISubmitDao submitDao){
        _submitDao = submitDao;
    }

    public async Task<SubmissionResponseDto> RunAsync(SubmissionRequestDto submissionRequestDto){
        var result = await _submitDao.AddSubmission(submissionRequestDto);
        return new SubmissionResponseDto{
            SubmissionId = result.SubmissionId,
            State = result.State,
            TimeTakenInMilliSeconds = result.TimeTakenInMilliSeconds,
            MemoryTakenInKiloBytes = result.MemoryTakenInKiloBytes,
            Output = result.Output
        };
    }
}