using Microsoft.AspNetCore.Mvc;
using TonyBusinessLayer.Handlers;
using TonyCommon.DTOs;

namespace TonyServiceLayer.Controllers;

[ApiController]
[Route("api/v1/submissions")]
public class SubmissionsController : ControllerBase {
    private readonly ISubmitHandler _submitHandler;

    public SubmissionsController(ISubmitHandler submitHandler) {
        _submitHandler = submitHandler;
    }

    public async Task<ActionResult<SubmissionResponseDto>> Submission(SubmissionRequestDto submissionRequestDto) {
        var result = await _submitHandler.RunAsync(submissionRequestDto);
        return Ok(result);
    }
}