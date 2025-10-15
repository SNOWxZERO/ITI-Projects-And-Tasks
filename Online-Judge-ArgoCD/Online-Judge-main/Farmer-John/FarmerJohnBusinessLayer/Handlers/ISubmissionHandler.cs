using FarmerJohnCommon.DTOs;
namespace FarmerJohnBusinessLayer.Handlers;

public interface ISubmissionHandler {
    Task<SubmissionResponseDto> CreateSubmissionAsync(SubmissionRequestDto submissionRequestDto, DateTime dateTime);
    Task<List<HistoryResponseDto>> GetHistoryAsync(string userName);
}