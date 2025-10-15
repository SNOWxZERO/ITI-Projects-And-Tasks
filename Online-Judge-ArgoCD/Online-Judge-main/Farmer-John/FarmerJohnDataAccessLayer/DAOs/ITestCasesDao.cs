using FarmerJohnDataAccessLayer.Models;

namespace FarmerJohnDataAccessLayer.DAOs; 

public interface ITestCasesDao {
    Task<List<TestCaseModel>> GetTestCasesAsync(int problemId);
}