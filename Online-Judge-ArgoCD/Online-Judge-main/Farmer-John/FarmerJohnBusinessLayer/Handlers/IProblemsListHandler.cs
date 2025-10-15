using FarmerJohnCommon.DTOs;
using FarmerJohnDataAccessLayer.Models;

namespace FarmerJohnBusinessLayer.Handlers; 

public interface IProblemsListHandler {
    Task<ProblemListDto> GetProblemsAsync(PaginationFilterDto paginationFilterDto);
    Task<ProblemResponseDto> GetProblemAsync(int id);
    Task<List<TagModel>> GetTagsAsync();
}