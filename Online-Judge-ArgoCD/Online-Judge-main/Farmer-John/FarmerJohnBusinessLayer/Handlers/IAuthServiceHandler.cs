using FarmerJohnCommon.DTOs;

namespace FarmerJohnBusinessLayer.AuthHandler; 

public interface IAuthServiceHandler {
    Task<BaseAuthResponseDto> RegisterAsync(RegisterRequestDto rModel);
    Task<BaseAuthResponseDto> LoginAsync(LoginRequestDto rModel);
}