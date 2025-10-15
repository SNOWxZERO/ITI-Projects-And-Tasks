using FarmerJohnBusinessLayer.Handlers;
using FarmerJohnCommon.DTOs;
using FarmerJohnDataAccessLayer.DAOs;
using FarmerJohnDataAccessLayer.Models;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace FarmerJohnBusinessLayer; 

public class ProblemListHandler : IProblemsListHandler{
    private readonly IProblemsDao problemDao;

    public ProblemListHandler(IProblemsDao problemsDao) {
        problemDao = problemsDao;
    }
    public async Task<ProblemListDto> GetProblemsAsync(PaginationFilterDto filterDto) {
        var totalNumberOfProblems = await problemDao.CountProblems();
        
        var validFilter = new PaginationFilterDto(filterDto.Skip, filterDto.Count, totalNumberOfProblems);
        
        var problems = await problemDao.GetProblems(validFilter.Skip, validFilter.Count);
        
        if (problems == null || !problems.Any()) {
            return new ProblemListDto {
                ResponseDescription = "The Problem List Is Empty",
                ResponseCode = "5",
                NumberOfProblems = 0
            };
        }
            
        var AllProblem = new ProblemListDto {
            ResponseDescription = "Retrieved List Of Problems Successfully",
            ResponseCode = "6",
            Problems = await Convert(problems),
            NumberOfProblems = totalNumberOfProblems
        };
        return AllProblem;
    }
    public async Task<ProblemResponseDto> GetProblemAsync(int id) {
        var getProblem = await problemDao.GetProblemByIdAsync(id);
        if (getProblem == null) {
            return new ProblemResponseDto {
                ResponseDescription = "The Problem Does Not Exist",
                ResponseCode = "9"
            };
        }

        var problem = new ProblemResponseDto {
            ResponseDescription = "Retrieved Problem is Successfully",
            ResponseCode = "10",
            Name = getProblem.Name,
            Difficulty = getProblem.Difficulty,
            ProblemStatment = getProblem.ProblemStatement,
            TimeLimitInMilliSeconds = getProblem.TimeLimitInMilliSeconds,
            MemoryLimitInKiloBytes = getProblem.MemoryLimitInKiloBytes,
            Tags = getProblem.Tags.Select(x => x.TagId).ToList(),
            TestCases = getProblem.TestCases.Select(x => new BaseTestCaseResponseDto
            {
                Input = x.Input,
                Output = x.Output
            }).ToList()

        };
        return problem;
    }

    public async Task<List<TagModel>> GetTagsAsync() {
        return await problemDao.GetTags();
    }

    public async Task<List<BaseProblemResponseDto>> Convert(List<ProblemModel> problemModels) {
        List<BaseProblemResponseDto> dtos = new List<BaseProblemResponseDto>();
        
        foreach (var problemModel in problemModels) {
            BaseProblemResponseDto dto = new BaseProblemResponseDto {
                Id = problemModel.ProblemId,
                Name = problemModel.Name,
                Difficulty = problemModel.Difficulty,
                Tags = await problemDao.GetTagsOfProblemAsync(problemModel.ProblemId)
            };
            dtos.Add(dto);
        }
        return dtos;
    }
}