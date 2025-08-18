from Utils.validation import input_nonempty
from MainOperations.db import db_connect
from Utils.helpers import print_centered, clear_terminal, print_separator
from re import compile
from typing import Optional, Tuple
from os import urandom
from sqlite3 import IntegrityError
import getpass
import hashlib
import binascii
import uuid

# Egyptian mobile regex: 11 digits, starts with 010,011,012,015
EG_PHONE_RE = compile(r"^01[0125]\d{8}$")
EMAIL_RE = compile(r"^[^@]+@[^@]+\.[^@]+$")


def hash_password(password: str, salt: Optional[bytes] = None) -> Tuple[str, str]:
    """Return (hex_hash, hex_salt). Uses pbkdf2_hmac."""
    if salt is None:
        salt = urandom(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100_000)
    return binascii.hexlify(dk).decode(), binascii.hexlify(salt).decode()


def verify_password(password: str, hex_hash: str, hex_salt: str) -> bool:
    salt = binascii.unhexlify(hex_salt)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100_000)
    return binascii.hexlify(dk).decode() == hex_hash


def register():
    clear_terminal()
    print_separator()
    print()
    print_centered("=========== Register ===========")
    print()
    first = input_nonempty("First name: ")
    last = input_nonempty("Last name: ")
    while True:
        email = input_nonempty("Email: ").lower()
        if not EMAIL_RE.match(email):
            print_centered("==== Invalid email format. ====")
            continue
        break
    while True:
        phone = input_nonempty("Mobile phone (Egyptian format, e.g. 010XXXXXXXX): ")
        if not EG_PHONE_RE.match(phone):
            print(
                "Invalid Egyptian mobile number. Must be 11 digits starting with 010,011,012 or 015."
            )
            continue
        break
    while True:
        password = getpass.getpass("Password: ")
        password2 = getpass.getpass("Confirm password: ")
        if password != password2:
            print_centered("==== Passwords do not match. ====")
            continue
        if len(password) < 6:
            print_centered("==== Password must be at least 6 characters. ====")
            continue
        break

    pw_hash, salt = hash_password(password)
    activation_code = str(uuid.uuid4())[:8]  # short code
    conn = db_connect()
    try:
        conn.execute(
            "INSERT INTO users (first_name, last_name, email, phone, password_hash, salt, activated, activation_code) VALUES (?, ?, ?, ?, ?, ?, 0, ?)",
            (first, last, email, phone, pw_hash, salt, activation_code),
        )
        conn.commit()
    except IntegrityError:
        print_centered("==== Email already registered. ====")
        conn.close()
        return
    conn.close()
    print_separator()
    print()
    print_centered("=================== Registration successful. ====================")
    print_centered("|                                                               |")
    print_centered(f"|======== Activation code is : ** {activation_code} **  ======|")
    print_centered("| Use the Activate account menu option to activate your account |")
    print_centered("|                                                               |")
    print_centered("=================================================================")


def activate_account():
    clear_terminal()
    print_separator()
    print()
    print_centered("=========== Activate Account ===========")
    print()
    email = input_nonempty("Email: ").lower()
    code = input_nonempty("Activation code: ")
    conn = db_connect()
    cur = conn.execute(
        "SELECT id, activated, activation_code FROM users WHERE email = ?", (email,)
    )
    row = cur.fetchone()
    if not row:
        print_centered("==== No such email registered. ====")
        conn.close()
        return
    if row["activated"]:
        print_centered("==== Account is already activated. ====")
        conn.close()
        return
    if row["activation_code"] == code:
        conn.execute(
            "UPDATE users SET activated = 1, activation_code = NULL WHERE id = ?",
            (row["id"],),
        )
        conn.commit()
        print_centered("==== Account activated! You can now login. ^_^ ====")
    else:
        print_centered("==== Invalid activation code. ====")
    print()
    conn.close()


def login() -> Optional[dict]:
    clear_terminal()
    print_separator()
    print()
    print_centered("=========== Login ===========")
    print()
    email = input_nonempty("Email: ").lower()
    password = getpass.getpass("Password: ")
    conn = db_connect()
    cur = conn.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    conn.close()
    if not row:
        print_centered("==== Invalid email or password. ====")
        return None
    if not row["activated"]:
        print_centered("==== Account not activated. Please activate first. ====")
        return None
    if verify_password(password, row["password_hash"], row["salt"]):
        print_separator()
        print_centered(f"==== Welcome back, {row['first_name']}! ^_^ ====")
        return dict(row)
    else:
        print_centered("==== Invalid email or password. ====")
        return None
