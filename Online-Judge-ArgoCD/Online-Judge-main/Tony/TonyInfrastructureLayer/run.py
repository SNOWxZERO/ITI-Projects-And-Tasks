import os, sys, time, resource, re

def compile(code, language):
    if language == 'python':
        return 200
    elif language == 'c':
        exit_status = os.system("gcc " + code + " -o " + code[:-2])
        if exit_status == 0:
            return 200
    elif language == 'cpp':
        exit_status = os.system("g++ " + code + " -o " + code[:-4])
        if exit_status == 0:
            return 200
    elif language == 'java':
        exit_status = os.system("javac " + code)
        if exit_status == 0:
            return 200
    return 400


def run(code, input, output, language, timeout='1'):
    command = ""
    if language == 'python':
        command = "python3 " + code
    elif language == 'c':
        command = "./" + code[:-2]
    elif language == 'cpp':
        command = "./" + code[:-4]
    elif language == 'java':
        command = "java " + code[:-5]

    start_time = time.time()
    exit_status = os.system('timeout ' + timeout + ' ' + command + ' < ' + input + ' > ' + output)
    end_time = time.time()

    # memory consumption by kilobytes
    memory_consumed = (resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss) / 1024
    #time consumed by milliseconds
    time_consumed = (end_time - start_time) * 1000
    
    if memory_consumed >= 256 * 1024:
        init(time_consumed, 256 * 1024)
        return 413
       
    if exit_status == 31744 or time_consumed >= 1000:
        init(1000, memory_consumed)
        return 408 
                          
    if exit_status == 0:
        init(time_consumed, memory_consumed)
        return 200
        
    if exit_status != 0:
        return 401

def init(time, memory):
    with open('time.txt', 'w') as f:
        f.write(str(time))
    with open('memory.txt', 'w') as f:
        f.write(str(memory))
    with open('verdict.txt', 'w') as f:
        f.write("Succeeded")


app_path = sys.argv[1]
input_path = sys.argv[2]
output_path = sys.argv[3]
language = sys.argv[4]

init(0, 0)

def change_class_name(java_code, new_class_name):
    # Match class declaration pattern
    pattern = r'\bclass\s+(\w+)\b'
    modified_code = re.sub(pattern, new_class_name, java_code)
    return modified_code

if language == 'java':
    with open(app_path, 'r') as file:
        java_code = file.read()

    modified_java_code = change_class_name(java_code, 'class app')

    with open(app_path, 'w') as file:
        file.write(modified_java_code)


cp = compile(app_path, language)
if cp == 200:
    x = run(app_path, input_path, output_path, language)
    if x != 200:
        with open('verdict.txt', 'w') as f:
            f.write("")
        if x == 408:
            with open('verdict.txt', 'w') as f:
                f.write("TimeLimitExceeded")
        elif x == 401:
            with open('verdict.txt', 'w') as f:
                f.write("RuntimeError")
        elif x == 413:
            with open('verdict.txt', 'w') as f:
                f.write("MemoryLimitExceeded")
else:
    with open('verdict.txt', 'w') as f:
        f.write("CompilationError")