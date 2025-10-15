using System.Text;
using FarmerJohnCommon.DTOs;
using FarmerJohnCommon.Enums;
using FarmerJohnDataAccessLayer.DAOs;
using FarmerJohnDataAccessLayer.Models;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace FarmerJohnBusinessLayer.Handlers;

public class SubmissionHandler : ISubmissionHandler{
    private readonly ISubmissionDao _submissionDao;
    private readonly ITestCaseVerdictsDao _testCaseVerdictsDao;
    private readonly ITestCasesDao _testCasesDao;
    private readonly IConfiguration _configuration;

    public SubmissionHandler(ISubmissionDao submissionDao, ITestCaseVerdictsDao testCaseVerdictsDao,
        ITestCasesDao testCasesDao, IConfiguration configuration){
        _submissionDao = submissionDao;
        _testCaseVerdictsDao = testCaseVerdictsDao;
        _testCasesDao = testCasesDao;
        _configuration = configuration;
    }

    public async Task<SubmissionResponseDto> CreateSubmissionAsync(SubmissionRequestDto submissionRequestDto,
        DateTime dateTime){
        int submissionId = await _submissionDao.CreateSubmissionAsync(submissionRequestDto, dateTime);
        var testCases = await _testCasesDao.GetTestCasesAsync(submissionRequestDto.ProblemId);

        int maxTimeTaken = 0, maxMemoryTaken = 0;
        foreach (var testCase in testCases){
            var submission = new TonyRequestDto{
                Input = testCase.Input,
                Language = submissionRequestDto.Language,
                Code = submissionRequestDto.Code
            };
            var tonyResponse = await PostTonyRequestAsync(submission);
            bool passed = VerifyVerdict(tonyResponse, testCase);
            maxTimeTaken = Math.Max(maxTimeTaken, tonyResponse.TimeTakenInMilliSeconds);
            maxMemoryTaken = Math.Max(maxMemoryTaken, tonyResponse.MemoryTakenInKiloBytes);
            var verdict = GetVerdict(tonyResponse.State);
            await _testCaseVerdictsDao.AddTestCaseVerdictAsync(submissionId, testCase.TestCaseId, tonyResponse, verdict);
            if (!passed){
                await _submissionDao.UpdateSubmissionAsync(submissionId, maxTimeTaken, maxMemoryTaken, verdict);
                return new SubmissionResponseDto{
                    TimeTakenInMilliSeconds = maxTimeTaken,
                    MemoryTakenInKiloBytes = maxMemoryTaken,
                    Verdict = verdict.ToString()
                };
            }
        }

        await _submissionDao.UpdateSubmissionAsync(submissionId, maxTimeTaken, maxMemoryTaken, Verdict.Accepted);
        return new SubmissionResponseDto{
            TimeTakenInMilliSeconds = maxTimeTaken,
            MemoryTakenInKiloBytes = maxMemoryTaken,
            Verdict = Verdict.Accepted.ToString()
        };
    }

    private bool VerifyVerdict(TonyResponseDto tonyResponseDto, TestCaseModel testCase){
        return tonyResponseDto.State == "Succeeded" && tonyResponseDto.Output == testCase.Output;
    }

    private async Task<TonyResponseDto> PostTonyRequestAsync(TonyRequestDto submission){
        var clientHandler = new HttpClientHandler{
            ServerCertificateCustomValidationCallback =
                HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        };
        var client = new HttpClient(clientHandler);
        var tonyBaseUrl = _configuration["Tony:BaseUrl"] ?? "http://localhost:7208";
        var url = $"{tonyBaseUrl}/api/v1/submissions";
        var json = JsonSerializer.Serialize(submission);
        var data = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(url, data);
        var content = await response.Content.ReadAsStringAsync();
        var tonyResponse = JsonSerializer.Deserialize<TonyResponseDto>(content); 
        return tonyResponse;
    }

    private Verdict GetVerdict(string state){
        switch (state){
            case "CompilationError":
                return Verdict.CompilationError;
            case "RuntimeError":
                return Verdict.RuntimeError;
            case "TimeLimitExceeded":
                return Verdict.TimeLimitExceeded;
            case "MemoryLimitExceeded":
                return Verdict.MemoryLimitExceeded;
        }

        return Verdict.WrongAnswer;
    }

    public async Task<List<HistoryResponseDto>> GetHistoryAsync(string userName){
        return await _submissionDao.GetHistoryAsync(userName);
    }
}