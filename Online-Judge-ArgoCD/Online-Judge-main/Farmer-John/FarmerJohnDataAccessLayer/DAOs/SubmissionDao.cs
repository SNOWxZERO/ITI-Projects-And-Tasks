using FarmerJohnCommon.DTOs;
using FarmerJohnCommon.Enums;
using FarmerJohnDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace FarmerJohnDataAccessLayer.DAOs;

public class SubmissionDao : ISubmissionDao{
    private readonly FramerJohnDbContext _dbContext;
    private readonly IUserDao _userDao;

    public SubmissionDao(FramerJohnDbContext framerJohnDbContext, IUserDao userDao){
        _dbContext = framerJohnDbContext;
        _userDao = userDao;
    }

    public async Task<int> CreateSubmissionAsync(SubmissionRequestDto submissionRequestDto, DateTime dateTime){
        var newSubmission = new SubmissionModel{
            ProblemId = submissionRequestDto.ProblemId,
            Language = submissionRequestDto.Language,
            Code = submissionRequestDto.Code,
            SubmissionDate = dateTime,
            UserId = await GetUserId(submissionRequestDto.UserName),
            TimeTakenInMilliSeconds = 0,
            MemoryTakenInKiloBytes = 0,
            Verdict = Verdict.Pending
        };
        _dbContext.Submissions.Add(newSubmission);
        await _dbContext.SaveChangesAsync();
        return newSubmission.SubmissionId;
    }
    
    public async Task UpdateSubmissionAsync(int submissionId, int timeTakenInMilliSeconds, int memoryTakenInKiloBytes,
        Verdict verdict){
        var currentSubmission = await _dbContext.Submissions.FindAsync(submissionId);
        currentSubmission.Verdict = verdict;
        currentSubmission.TimeTakenInMilliSeconds = timeTakenInMilliSeconds;
        currentSubmission.MemoryTakenInKiloBytes = memoryTakenInKiloBytes;
        await _dbContext.SaveChangesAsync();
    }
    private async Task<int> GetUserId(string username){
        var user = await _userDao.GetUserByUsername(username);
        return user.Id;
    }
    
    public async Task<List<HistoryResponseDto>> GetHistoryAsync(string userName){
        var user = await _userDao.GetUserByUsername(userName);
        var submissions = await _dbContext.Submissions.Where(s => s.UserId == user.Id).ToListAsync();
        var historyResponseDtos = new List<HistoryResponseDto>();
        foreach (var submission in submissions){
            var problem = await _dbContext.Problems.FindAsync(submission.ProblemId);
            historyResponseDtos.Add(new HistoryResponseDto{
                ProblemName = problem.Name,
                ProblemId = problem.ProblemId,
                Language = submission.Language.ToString(),
                SubmissionDate = submission.SubmissionDate,
                TimeTakenInMilliSeconds = submission.TimeTakenInMilliSeconds,
                MemoryTakenInKiloBytes = submission.MemoryTakenInKiloBytes,
                Verdict = submission.Verdict.ToString()
            });
        }
        return historyResponseDtos;
    }
}