using FarmerJohnBusinessLayer.Handlers;
using FarmerJohnCommon.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerJohnServiceLayer.Controllers;

[ApiController]
[Route("api/v1/problems")]
public class ProblemsController : Controller{
    private readonly IProblemsListHandler _problemList;
    private readonly ICreateProblemHandler _createProblemHandler;

    public ProblemsController(IProblemsListHandler problemList, ICreateProblemHandler createProblemHandler){
        _problemList = problemList;
        _createProblemHandler = createProblemHandler;
    }

    [HttpGet]
    public async Task<ActionResult<ProblemListDto>> Problems([FromQuery] PaginationFilterDto filter){
        var result = await _problemList.GetProblemsAsync(filter);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProblemResponseDto>> Problems(int id){
        var result = await _problemList.GetProblemAsync(id);
        return Ok(result);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BaseResponseDto>> Problems([FromBody] ProblemDto createProblemRequestDto){
        var result = await _createProblemHandler.CreateProblemAsync(createProblemRequestDto);
        return Ok(result);
    }
}