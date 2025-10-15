using FarmerJohnCommon.DTOs;
using FarmerJohnDataAccessLayer.Models;

namespace FarmerJohnDataAccessLayer.DAOs; 

public interface IProblemsDao {
    public Task<List<ProblemModel>> GetProblems(int skip, int count);
    public Task<ProblemModel> GetProblemByIdAsync(int problemId);
    public Task<List<int>> GetTagsOfProblemAsync(int problemId);
    public Task<int> CountProblems();
    public Task<List<TagModel>> GetTags();
    public Task AddProblem(ProblemDto createProblemRequestDto);
    public Task<ProblemModel> GetProblemByNameAsync(string name);
}