namespace FarmerJohnCommon.DTOs;

public class PaginationFilterDto {
    public int Skip { get; set; }
    public int Count { get; set; }

    public PaginationFilterDto() {
        Skip = 0;
        Count = 10;
    }

    public PaginationFilterDto(int skip, int count, int totalNumberOfProblems) {
        Skip = Math.Max(0, Math.Min(skip, totalNumberOfProblems));
        Count = Math.Max(0, Math.Min(count, totalNumberOfProblems));
    }
}