using TonyCommon.DTOs;

namespace TonyInfrastructureLayer.Handlers;

public interface IWorker{
    Task<SubmissionResultDto> SubmitCodeAsync(string input, string code, string language);
}