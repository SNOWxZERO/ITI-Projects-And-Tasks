using FarmerJohnCommon.DTOs;
using FarmerJohnCommon.Enums;
using FarmerJohnDataAccessLayer.Models;

namespace FarmerJohnDataAccessLayer.DAOs; 

public interface ITestCaseVerdictsDao { 
    Task AddTestCaseVerdictAsync(int submissionId, int testCaseId, TonyResponseDto tonyResponseDto, Verdict verdict);
}