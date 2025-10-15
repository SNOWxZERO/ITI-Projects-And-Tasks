using FarmerJohnBusinessLayer.AuthHandler;
using FarmerJohnCommon.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FarmerJohnServiceLayer.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : Controller{
    private readonly IAuthServiceHandler _authServiceHandler;

    public LoginController(IAuthServiceHandler authServiceHandler){
        _authServiceHandler = authServiceHandler;
    }

    [HttpPost]
    public async Task<ActionResult<BaseAuthResponseDto>> Login([FromBody] LoginRequestDto loginRequestDto){
        var result = await _authServiceHandler.LoginAsync(loginRequestDto);
        return Ok(result);
    }
}