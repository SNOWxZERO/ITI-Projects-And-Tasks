using FarmerJohnBusinessLayer.AuthHandler;
using FarmerJohnCommon.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FarmerJohnServiceLayer.Controllers;

[ApiController]
[Route("api/v1/user")]
public class RegisterController : Controller{
    private readonly IAuthServiceHandler _authServiceHandler;

    public RegisterController(IAuthServiceHandler authServiceHandler){
        _authServiceHandler = authServiceHandler;
    }

    [HttpPost]
    public async Task<ActionResult<BaseResponseDto>> RegisterAsync([FromBody] RegisterRequestDto registerRequestDto){
        var result = await _authServiceHandler.RegisterAsync(registerRequestDto);
        return Ok(result);
    }
}