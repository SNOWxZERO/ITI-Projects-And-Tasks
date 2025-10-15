using FarmerJohnCommon.DTOs;
using FarmerJohnCommon.Enums;
using FarmerJohnDataAccessLayer.Models;

namespace FarmerJohnDataAccessLayer.DAOs;

public class TestCaseVerdictsDao : ITestCaseVerdictsDao{
    private readonly FramerJohnDbContext _dbContext;

    public TestCaseVerdictsDao(FramerJohnDbContext framerJohnDbContext){
        _dbContext = framerJohnDbContext;
    }

    public async Task AddTestCaseVerdictAsync(int submissionId, int testCaseId, TonyResponseDto tonyResponseDto,
        Verdict verdict){
        var currentSubmission = new TestcaseVerdictModel{
            SubmissionId = submissionId,
            TestCaseId = testCaseId,
            Verdict = verdict,
            TimeTakenInMilliSeconds = tonyResponseDto.TimeTakenInMilliSeconds,
            MemoryTakenInKiloBytes = tonyResponseDto.TimeTakenInMilliSeconds,
            Output = tonyResponseDto.Output
        };
        _dbContext.TestcaseVerdicts.Add(currentSubmission);
        await _dbContext.SaveChangesAsync();
    }
}