using FarmerJohnCommon.DTOs;
using FarmerJohnDataAccessLayer.DAOs;

namespace FarmerJohnBusinessLayer.Handlers; 

public class CreateProblemHandler : ICreateProblemHandler{
    private readonly IProblemsDao problemDao;

    public CreateProblemHandler(IProblemsDao problemsDao) {
        problemDao = problemsDao;
    }
    public async Task<BaseResponseDto> CreateProblemAsync(ProblemDto ProblemDto) {
        if (await problemDao.GetProblemByNameAsync(ProblemDto.Name) != null) {
            return new BaseResponseDto {
                ResponseDescription = "The Name of problem is already used before",
                ResponseCode = "7",
            }; 
        }

        await problemDao.AddProblem(ProblemDto);
        return new BaseResponseDto {
            ResponseDescription = "The problem is created successfully",
            ResponseCode = "8",
        }; 
    }
}