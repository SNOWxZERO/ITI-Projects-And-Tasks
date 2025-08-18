import shutil
import os


def set_terminal_width():
    global WIDTH
    WIDTH = shutil.get_terminal_size().columns


def print_centered(text: str):
    print(text.center(WIDTH))


def print_centered_block(lines: str):
    for line in lines:
        print_centered(line)


def print_separator():
    print("=" * WIDTH)


def clear_terminal():
    os.system("cls" if os.name == "nt" else "clear")


def wait_for_user_input(prompt: str = "Press Enter to continue..."):
    input(prompt)
