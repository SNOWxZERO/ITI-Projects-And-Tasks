using FarmerJohnCommon.DTOs;
using FarmerJohnCommon.Enums;

namespace FarmerJohnDataAccessLayer.DAOs;

public interface ISubmissionDao {
    Task<int> CreateSubmissionAsync(SubmissionRequestDto submissionRequestDto, DateTime dateTime);
    Task UpdateSubmissionAsync(int submissionId, int timeTakenInMilliSeconds, int memoryTakenInKiloBytes, Verdict verdict);
    Task<List<HistoryResponseDto>> GetHistoryAsync(string userName);
}