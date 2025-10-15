using FarmerJohnBusinessLayer.Handlers;
using FarmerJohnCommon.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerJohnServiceLayer.Controllers;

[ApiController]
[Route("api/v1/submissions")]
public class SubmissionsController : ControllerBase{
    private readonly ISubmissionHandler _submissionHandler;

    public SubmissionsController(ISubmissionHandler submissionHandler){
        _submissionHandler = submissionHandler;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<SubmissionResponseDto>> Submit([FromBody] SubmissionRequestDto submissionRequestDto){
        var result = await _submissionHandler.CreateSubmissionAsync(submissionRequestDto, DateTime.Now);
        return Ok(result);
    }
    
    [HttpGet("{userName}")]
    [Authorize]
    public async Task<ActionResult<List<HistoryResponseDto>>> History(string userName){
        var result = await _submissionHandler.GetHistoryAsync(userName);
        return Ok(result);
    }
}
