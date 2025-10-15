using TonyCommon.DTOs;

namespace TonyBusinessLayer.Handlers;

public interface ISubmitHandler{
    Task<SubmissionResponseDto> RunAsync(SubmissionRequestDto submissionRequestDto);
}