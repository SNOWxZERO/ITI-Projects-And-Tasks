using TonyCommon.DTOs;
using TonyCommon.Enums;

namespace TonyDataAccessLayer.DAOs; 

public interface ISubmitDao {
    Task<SubmissionResponseDto> AddSubmission(SubmissionRequestDto submissionRequestDto);
}