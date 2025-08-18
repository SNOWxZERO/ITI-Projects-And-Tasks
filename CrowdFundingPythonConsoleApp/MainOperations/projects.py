from Utils.validation import require_logged_in, input_nonempty, parse_date
from MainOperations.db import db_connect
from datetime import datetime, timedelta
from Utils.helpers import clear_terminal, print_centered, print_separator
from tabulate import tabulate


def create_project(session_user):
    if not require_logged_in(session_user):
        return
    print("\n== Create Project ==")
    title = input_nonempty("Title: ")
    details = input("Details (optional): ").strip()
    while True:
        target_raw = input_nonempty("Total target (EGP): ")
        if not target_raw.isdigit():
            print("Target must be a positive integer (EGP).")
            continue
        target = int(target_raw)
        if target <= 0:
            print("Target must be positive.")
            continue
        break

    while True:
        print_centered(
            "==== Set Project Start Date (YYYY-MM-DD HH:MM or leave blank for now) ===="
        )
        start_raw = input("Start date:").strip()
        if start_raw == "":
            start_raw = datetime.now().strftime("%Y-%m-%d %H:%M")

        start_dt = parse_date(start_raw)
        if not start_dt:
            print("Invalid start date format.")
            continue
        print_centered(f"Start date set to: {start_dt}")
        print()

        print_centered(
            "==== Set Project End Date (YYYY-MM-DD HH:MM or leave blank for 1 month later) ===="
        )
        end_raw = input("End date (YYYY-MM-DD or YYYY-MM-DD HH:MM): ").strip()
        if end_raw == "":
            end_raw = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d %H:%M")

        end_dt = parse_date(end_raw)
        if not end_dt:
            print("Invalid end date format.")
            continue

        if start_dt >= end_dt:
            print("Start date must be before end date.")
            continue

        break

    conn = db_connect()
    conn.execute(
        """
        INSERT INTO projects (owner_id, title, details, target, start_date, end_date, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """,
        (
            session_user["id"],
            title,
            details,
            target,
            start_dt.isoformat(),
            end_dt.isoformat(),
            datetime.now().isoformat(),
        ),
    )
    conn.commit()
    conn.close()
    print("Project created successfully.")


def view_projects(show_only_user=False, session_user=None):
    clear_terminal()
    print_separator()
    print()
    print_centered("=========== Projects ===========")
    print()

    conn = db_connect()
    if show_only_user and session_user:
        cur = conn.execute(
            """
            SELECT p.*, u.first_name || ' ' || u.last_name as owner_name
            FROM projects p JOIN users u ON p.owner_id = u.id
            WHERE p.owner_id = ?
            ORDER BY p.created_at DESC
        """,
            (session_user["id"],),
        )
    else:
        cur = conn.execute("""
            SELECT p.*, u.first_name || ' ' || u.last_name as owner_name
            FROM projects p JOIN users u ON p.owner_id = u.id
            ORDER BY p.created_at DESC
        """)
    rows = cur.fetchall()
    conn.close()
    if not rows:
        print_centered("==== No projects found. ====")
        return
    headers = [
        "ID",
        "Owner ID",
        "Title",
        "Details",
        "Target (EGP)",
        "Start Date",
        "End Date",
        "Created At",
        "Owner",
    ]
    print(tabulate(rows, headers=headers, tablefmt="grid", showindex=False))


def edit_project(session_user):
    if not require_logged_in(session_user):
        return
    view_projects(show_only_user=True, session_user=session_user)
    pid = input("Enter project ID to edit (or blank to cancel): ").strip()
    print()
    if not pid.isdigit() or pid == "":
        print_centered("==== Cancelled or invalid ID. ====")
        return
    pid = int(pid)
    conn = db_connect()
    cur = conn.execute("SELECT * FROM projects WHERE id = ?", (pid,))
    row = cur.fetchone()
    if not row:
        print_centered("==== Project not found ====")
        conn.close()
        return
    if row["owner_id"] != session_user["id"]:
        print_centered("==== You can only edit your own projects. ====")
        conn.close()
        return
    print()
    print_centered("==== Leave field blank to keep current value ====")
    print()
    new_title = input(f"Title [{row['title']}]: ").strip() or row["title"]
    new_details = input(f"Details [{row['details'] or ''}]: ").strip() or row["details"]
    while True:
        new_target_raw = input(f"Target (EGP) [{row['target']}]: ").strip() or str(
            row["target"]
        )
        if not new_target_raw.isdigit():
            print_centered("==== Target must be a positive integer. ====")
            continue
        new_target = int(new_target_raw)
        if new_target <= 0:
            print_centered("==== Target must be positive. ====")
            continue
        break
    while True:
        s_raw = input(f"Start date [{row['start_date']}]: ").strip()
        if s_raw == "":
            s_dt = parse_date(row["start_date"])
        else:
            s_dt = parse_date(s_raw)
            if not s_dt:
                print("Invalid date format.")
                continue
        e_raw = input(f"End date [{row['end_date']}]: ").strip()
        if e_raw == "":
            e_dt = parse_date(row["end_date"])
        else:
            e_dt = parse_date(e_raw)
            if not e_dt:
                print("Invalid date format.")
                continue

        if s_dt >= e_dt:  # type: ignore
            print("Start date must be before end date.")
            continue
        break
    conn.execute(
        """
        UPDATE projects SET title=?, details=?, target=?, start_date=?, end_date=?
        WHERE id=?
    """,
        (new_title, new_details, new_target, s_dt.isoformat(), e_dt.isoformat(), pid),  # type: ignore
    )
    conn.commit()
    conn.close()
    print_centered("==== Project updated. ====")
    print()


def delete_project(session_user):
    if not require_logged_in(session_user):
        return
    view_projects(show_only_user=True, session_user=session_user)
    pid = input("Enter project ID to delete (or blank to cancel): ").strip()
    print()
    if not pid.isdigit() or pid == "":
        print_centered("==== Cancelled or invalid ID. ====")
        return
    pid = int(pid)
    conn = db_connect()
    cur = conn.execute("SELECT * FROM projects WHERE id = ?", (pid,))
    row = cur.fetchone()
    if not row:
        print_centered("==== Project not found ====")
        conn.close()
        return
    if row["owner_id"] != session_user["id"]:
        print_centered("==== You can only delete your own projects. ====")
        conn.close()
        return
    confirm = input("Type DELETE to confirm deletion: ")
    if confirm != "DELETE":
        print_centered("==== Deletion cancelled. ====")
        conn.close()
        return
    conn.execute("DELETE FROM projects WHERE id = ?", (pid,))
    conn.commit()
    conn.close()
    print_centered("==== Project deleted. ====")
    print()
