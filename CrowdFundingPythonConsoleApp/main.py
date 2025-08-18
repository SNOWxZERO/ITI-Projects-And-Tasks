from MainOperations.db import init_db
from MainOperations.auth import register, activate_account, login
from MainOperations.projects import (
    create_project,
    view_projects,
    edit_project,
    delete_project,
)
from MainOperations.search import search_projects_by_date
from Utils.helpers import (
    set_terminal_width,
    print_centered,
    print_separator,
    clear_terminal,
    wait_for_user_input,
)
import sys
import os


def main_menu():
    init_db()
    session_user = None
    while True:
        set_terminal_width()
        clear_terminal()
        print_separator()
        print()
        if not session_user:
            print_centered("============================================")
            print_centered("|| Welcome to CrowdFunding Console System ||")
            print_centered("============================================")
            print()
            print_centered("Please Select an Option:")
            print()
            print_centered(":.:.:.:.:.: Main Menu :.:.:.:.:.:")
            print_centered("|                               |")
            print_centered("|   1) Register                 |")
            print_centered("|   2) Activate account         |")
            print_centered("|   3) Login                    |")
            print_centered("|   4) View all projects        |")
            print_centered("|   5) Search projects by date  |")
            print_centered("|   0) Quit                     |")
            print_centered("|                               |")
            print_centered("=================================")

            choice = input("Select: ").strip()
            if choice == "1":
                register()
            elif choice == "2":
                activate_account()
            elif choice == "3":
                user = login()
                if user:
                    session_user = user
            elif choice == "4":
                view_projects(show_only_user=False)
            elif choice == "5":
                search_projects_by_date()
            elif choice == "0":
                print_centered("==== Goodbye, Hope you have a great day ^_^ ====")
                print()
                print_separator()
                break
            else:
                print_centered("==== Invalid choice. ====")
            print()
            print_separator()
            wait_for_user_input()
        else:
            print_centered(
                f"Logged in as: {session_user['first_name']} {session_user['last_name']} ({session_user['email']})"
            )
            print()
            print_centered("Please Select an Option:")
            print()
            print_centered(":.:.:.:.:.: Main Menu :.:.:.:.:.:")
            print_centered("|                               |")
            print_centered("|   1) Create project           |")
            print_centered("|   2) View all projects        |")
            print_centered("|   3) View my projects         |")
            print_centered("|   4) Edit my project          |")
            print_centered("|   5) Delete my project        |")
            print_centered("|   6) Search projects by date  |")
            print_centered("|   7) Logout                   |")
            print_centered("|   0) Quit                     |")
            print_centered("|                               |")
            print_centered("=================================")
            choice = input("Select: ").strip()
            print()
            if choice == "1":
                create_project(session_user)
            elif choice == "2":
                view_projects(show_only_user=False)
            elif choice == "3":
                view_projects(show_only_user=True, session_user=session_user)
            elif choice == "4":
                edit_project(session_user)
            elif choice == "5":
                delete_project(session_user)
            elif choice == "6":
                search_projects_by_date()
            elif choice == "7":
                session_user = None
                print_centered("==== Logged out ====")
            elif choice == "0":
                print_centered("==== Goodbye, Hope you have a great day ^_^ ====")
                print_separator()
                break
            else:
                print_centered("==== Invalid choice. ====")

            print(" ")
            print_separator()
            wait_for_user_input()


if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print()
        print_centered("==== Interrupted @_@, Exiting ====")
        print()
        print_separator()
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
