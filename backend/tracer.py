import sys
import json
import ast
import linecache

steps = []
variables = {}

def record_step(event, lineno, filename, code_line):
    steps.append({
        "event": event,
        "line": lineno,
        "code": code_line.strip(),
        "variables": dict(variables)  # copy current vars
    })

def trace_func(frame, event, arg):
    if frame.f_code.co_filename != code_file:
        return trace_func  # Ignore system files

    lineno = frame.f_lineno
    code_line = linecache.getline(code_file, lineno)

    if event == "line":
        record_step("execute_line", lineno, code_file, code_line)

    elif event == "return":
        record_step(f"return {arg}", lineno, code_file, code_line)

    elif event == "call":
        record_step("function_call", lineno, code_file, code_line)

    # Update variables after each line execution
    variables.update(frame.f_locals)

    return trace_func

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No code file provided"}))
        sys.exit(1)

    code_file = sys.argv[1]

    sys.settrace(trace_func)
    try:
        with open(code_file, "r") as f:
            code = f.read()
        exec(compile(code, code_file, 'exec'), {})
    except Exception as e:
        steps.append({"error": str(e)})
    finally:
        sys.settrace(None)

    print(json.dumps(steps))
