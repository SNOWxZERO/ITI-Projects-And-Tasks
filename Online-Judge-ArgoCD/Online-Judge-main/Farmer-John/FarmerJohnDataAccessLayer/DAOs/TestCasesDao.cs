using FarmerJohnDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace FarmerJohnDataAccessLayer.DAOs;

public class TestCasesDao : ITestCasesDao{
    private readonly FramerJohnDbContext _dbContext;

    public TestCasesDao(FramerJohnDbContext framerJohnDbContext){
        _dbContext = framerJohnDbContext;
    }

    public async Task<List<TestCaseModel>> GetTestCasesAsync(int problemId){
        return await _dbContext.TestCases
            .Where(tc => tc.ProblemId == problemId)
            .ToListAsync();
    }
}