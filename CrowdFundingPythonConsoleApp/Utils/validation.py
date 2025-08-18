from datetime import datetime
from typing import Optional


def input_nonempty(prompt: str) -> str:
    while True:
        v = input(prompt).strip()
        print()
        if v:
            return v
        print("Value can't be empty.")


def input_question(prompt: str) -> bool:
    while True:
        v = input(prompt + "\nPress y to confirm or any other key to cancel: ").strip()
        if v.lower() == "y":
            return True
        return False


def require_logged_in(session_user):
    if session_user is None:
        print("You must be logged in to perform that action.")
        return False
    return True


def parse_date(date_str: str) -> Optional[datetime]:
    """Accepts YYYY-MM-DD or YYYY-MM-DD HH:MM or YYYY-MM-DDTHH:MM:SS formats."""
    for fmt in ("%Y-%m-%d %H:%M", "%Y-%m-%d", "%Y-%m-%dT%H:%M:%S"):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    return None
