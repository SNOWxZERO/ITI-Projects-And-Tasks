using FarmerJohnCommon.DTOs;
using FarmerJohnDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace FarmerJohnDataAccessLayer.DAOs;

public class ProblemDao : IProblemsDao{
    private readonly FramerJohnDbContext _dbContext;

    public ProblemDao(FramerJohnDbContext framerJohnDbDbContext){
        _dbContext = framerJohnDbDbContext;
    }

    public async Task<List<ProblemModel>> GetProblems(int skip, int count){
        var problems = await _dbContext.Problems
            .Select(p => new ProblemModel{
                ProblemId = p.ProblemId,
                Name = p.Name,
                Difficulty = p.Difficulty,
            }).Skip(skip).Take(count)
            .ToListAsync();

        return problems;
    }

    public async Task<ProblemModel> GetProblemByIdAsync(int problemId){
        var problem = await _dbContext.Problems
            .Include(p => p.Tags)
            .Include(p => p.TestCases)
            .Where(p => p.ProblemId == problemId)
            .Select(p => new ProblemModel{
                Name = p.Name,
                Difficulty = p.Difficulty,
                TimeLimitInMilliSeconds = p.TimeLimitInMilliSeconds,
                MemoryLimitInKiloBytes = p.MemoryLimitInKiloBytes,
                ProblemStatement = p.ProblemStatement,
                Tags = p.Tags.Select(t => new TagModel{
                    TagId = t.TagId,
                }).ToList(),
                TestCases = p.TestCases.Where(x => x.IsSample)
                    .OrderBy(x => x.Order)
                    .Select(tc => new TestCaseModel{
                        Input = tc.Input,
                        Output = tc.Output
                    }).ToList()
            })
            .FirstOrDefaultAsync();
        return problem;
    }

    public async Task<List<TagModel>> GetTags(){
        var tags = await _dbContext.Tags.ToListAsync();
        return tags;
    }

    public async Task AddProblem(ProblemDto createProblemRequestDto){
        var newProblem = new ProblemModel{
            Name = createProblemRequestDto.Name,
            Difficulty = createProblemRequestDto.Difficulty,
            TimeLimitInMilliSeconds = createProblemRequestDto.TimeLimitInMilliSeconds,
            MemoryLimitInKiloBytes = createProblemRequestDto.MemoryLimitInKiloBytes,
            ProblemStatement = createProblemRequestDto.ProblemStatment,
            Tags = new List<TagModel>(),
            TestCases = new List<TestCaseModel>()
        };

        foreach (var tagId in createProblemRequestDto.Tags){
            var tag = await _dbContext.Tags.FindAsync(tagId);
            newProblem.Tags.Add(tag);
        }

        int cnt = 1;

        foreach (var testCaseRequest in createProblemRequestDto.TestCases){
            var testCase = new TestCaseModel{
                Input = testCaseRequest.Input,
                Output = testCaseRequest.Output,
                IsHidden = testCaseRequest.IsHiden,
                IsSample = testCaseRequest.IsSample,
                Order = cnt++
            };
            newProblem.TestCases.Add(testCase);
        }

        _dbContext.Problems.Add(newProblem);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<ProblemModel> GetProblemByNameAsync(string name){
        return await _dbContext.Problems.SingleOrDefaultAsync(pr => pr.Name == name);
    }

    public async Task<List<int>> GetTagsOfProblemAsync(int problemId){
        var problem = await _dbContext.Problems.Include(p => p.Tags).FirstOrDefaultAsync(p => p.ProblemId == problemId);
        var tags = problem?.Tags.Select(t => t.TagId).ToList();
        return tags;
    }

    public async Task<int> CountProblems(){
        return await _dbContext.Problems.CountAsync();
    }
}