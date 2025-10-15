using FarmerJohnCommon.DTOs;

namespace FarmerJohnBusinessLayer.Handlers; 

public interface ICreateProblemHandler {
    Task<BaseResponseDto> CreateProblemAsync(ProblemDto createProblemRequestDto);
}