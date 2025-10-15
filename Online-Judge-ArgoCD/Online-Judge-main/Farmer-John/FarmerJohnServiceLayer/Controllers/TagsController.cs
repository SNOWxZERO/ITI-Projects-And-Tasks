using FarmerJohnBusinessLayer.Handlers;
using FarmerJohnCommon.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FarmerJohnServiceLayer.Controllers;

[ApiController]
[Route("api/v1/tags")]
public class TagsController : Controller{
    private readonly IProblemsListHandler _problemList;

    public TagsController(IProblemsListHandler problemList){
        _problemList = problemList;
    }

    public async Task<ActionResult<ProblemListDto>> Tags(){
        var result = await _problemList.GetTagsAsync();
        return Ok(result);
    }
}