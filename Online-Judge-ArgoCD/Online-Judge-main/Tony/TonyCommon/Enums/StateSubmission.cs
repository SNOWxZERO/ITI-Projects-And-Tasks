namespace TonyCommon.Enums; 

public enum StateSubmission {
    NOTFOUND,
    Running,
    TimeLimitExceeded,
    MemoryLimitExceeded,
    CompilationError,
    RuntimeError,
    Succeeded
}