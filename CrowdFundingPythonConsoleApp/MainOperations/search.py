from tabulate import tabulate
from Utils.helpers import print_centered
from Utils.validation import input_nonempty, parse_date
from MainOperations.db import db_connect


def search_projects_by_date():
    print_centered("==== Search Projects by (Start/End) Date =====")
    searchtype = input_nonempty("Search Type (1: Start Date, 2: End Date): ")
    if searchtype != "1" and searchtype != "2":
        print_centered("==== Invalid search type. ====")
        return
    
    print_centered("==== Enter date range to search projects ====")
    print()
    d1_raw = input_nonempty("Start date (YYYY-MM-DD): ")
    d1 = parse_date(d1_raw)
    if not d1:
        print_centered("==== Invalid date format. ====")
        return
    d2_raw = input(
        f"End date (YYYY-MM-DD) [optional, press Enter to use {d1_raw}]: "
    ).strip()
    print()
    if d2_raw == "":
        d2 = d1
    else:
        d2 = parse_date(d2_raw)
        if not d2:
            print_centered("==== Invalid date format. ====")
            return
    # normalize to full day range
    start_iso = d1.replace(hour=0, minute=0).isoformat()
    end_iso = d2.replace(hour=23, minute=59).isoformat()
    conn = db_connect()
    if searchtype == "1":
        # Search by start date
        cur = conn.execute(
            """
            SELECT p.*, u.first_name || ' ' || u.last_name as owner_name
            FROM projects p JOIN users u ON p.owner_id = u.id
            WHERE p.start_date >= ? AND p.start_date <= ?
            ORDER BY p.start_date
        """,
            (start_iso, end_iso),
        )
    else:
        # Search by end date
        cur = conn.execute(
            """
            SELECT p.*, u.first_name || ' ' || u.last_name as owner_name
            FROM projects p JOIN users u ON p.owner_id = u.id
            WHERE p.end_date >= ? AND p.end_date <= ?
            ORDER BY p.end_date
        """,
        (start_iso, end_iso),
    )
    rows = cur.fetchall()
    conn.close()
    if not rows:
        print_centered("==== No projects found matching the date range. ====")
        return
    print_centered(f"Projects in {start_iso} -> {end_iso}:")
    print()
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
