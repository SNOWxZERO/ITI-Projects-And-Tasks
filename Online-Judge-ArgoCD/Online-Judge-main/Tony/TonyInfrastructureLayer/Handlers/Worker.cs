using Docker.DotNet;
using Docker.DotNet.Models;
using TonyCommon.DTOs;

namespace TonyInfrastructureLayer.Handlers;

public class Worker : IWorker{
    public async Task<SubmissionResultDto> SubmitCodeAsync(string input, string code, string language){
        string requestId = Guid.NewGuid().ToString();

        string requestDir = Path.Combine("../TonyInfrastructureLayer/Submissions", requestId);

        Directory.CreateDirectory(requestDir);
        string codeFile;
        if (language == "python"){
            codeFile = "app.py";
        }
        else{
            codeFile = "app." + language;
        }

        await File.WriteAllTextAsync(Path.Combine(requestDir, "input.txt"), input);
        await File.WriteAllTextAsync(Path.Combine(requestDir, codeFile), code);
        await File.WriteAllTextAsync(Path.Combine(requestDir, "output.txt"), "");

        string runScript = Path.Combine("../TonyInfrastructureLayer", "run.py");
        string runScriptDest = Path.Combine(requestDir, "run.py");
        File.Copy(runScript, runScriptDest);

        var dockerClient = new DockerClientConfiguration().CreateClient();

        var containerCreateParams = new CreateContainerParameters{
            Image = "tony",
            HostConfig = new HostConfig{
                Memory = 512000000,
                NanoCPUs = 500000000,
                Binds = new List<string>{ Path.GetFullPath(requestDir) + ":/code" }
            },
            Cmd = new List<string>{ "python3", "run.py", codeFile, "input.txt", "output.txt", language },
        };

        var container = await dockerClient.Containers.CreateContainerAsync(containerCreateParams);
        await dockerClient.Containers.StartContainerAsync(container.ID, new ContainerStartParameters());
        await dockerClient.Containers.WaitContainerAsync(container.ID);

        string output = await File.ReadAllTextAsync(Path.Combine(requestDir, "output.txt"));
        string verdict = await File.ReadAllTextAsync(Path.Combine(Path.Combine(requestDir, "verdict.txt")));
        int timeTaken =
            Convert.ToInt32(double.Parse(await File.ReadAllTextAsync(Path.Combine(requestDir, "time.txt"))));
        int memoryTaken =
            Convert.ToInt32(double.Parse(await File.ReadAllTextAsync(Path.Combine(requestDir, "memory.txt"))));

        await dockerClient.Containers.RemoveContainerAsync(container.ID, new ContainerRemoveParameters());
        Directory.Delete(requestDir, true);

        var result = new SubmissionResultDto{
            Output = output,
            Verdict = verdict,
            TimeTakenInMilliSeconds = timeTaken,
            MemoryTakenInKiloBytes = memoryTaken
        };
        return result;
    }
}