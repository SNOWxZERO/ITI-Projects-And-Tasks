# 🚀 CrowdFunding Python Console App

A feature-rich console-based crowdfunding platform built with Python. This application provides a complete crowdfunding experience through an intuitive command-line interface, allowing users to create, manage, and discover funding projects with ease.

## ✨ Features

### 🔐 User Management

- **User Registration** with email validation and Egyptian mobile number support
- **Account Activation** system with unique activation codes
- **Secure Authentication** using PBKDF2 password hashing with salt
- **Session Management** for logged-in users

### 📊 Project Management

- **Create Projects** with title, description, funding target, and timeline
- **View All Projects** or filter to show only your own projects
- **Edit Projects** - modify any aspect of your projects
- **Delete Projects** with confirmation safety mechanism
- **Rich Project Display** using tabulated format for easy reading

### 🔍 Search & Discovery

- **Date-based Search** - find projects by start date or end date
- **Date Range Filtering** for precise project discovery
- **Comprehensive Project Listings** with owner information

### 🎨 User Experience

- **Clean Console Interface** with centered text and separators
- **Cross-platform Terminal Handling** (Windows/Unix)
- **Input Validation** with helpful error messages
- **Graceful Error Handling** and user feedback

## 🏗️ Project Structure

```text
📦 CrowdFundingPythonConsoleApp/
├── 📄 main.py                    # Application entry point and main menu
├── 📁 Data/
│   └── 📄 crowdfund.db           # SQLite database (auto-created)
├── 📁 MainOperations/
│   ├── 📄 auth.py                # User authentication & registration
│   ├── 📄 db.py                  # Database connection & initialization
│   ├── 📄 projects.py            # Project CRUD operations
│   └── 📄 search.py              # Project search functionality
├── 📁 Utils/
│   ├── 📄 helpers.py             # Terminal formatting & UI utilities
│   └── 📄 validation.py          # Input validation & date parsing
├── 📄 queues.json                # JSON data storage for additional features
├── 📄 PythonLab4.ipynb           # Jupyter notebook for development/testing
└── 📄 README.md                  # This file
```

## 🚦 Getting Started

### Prerequisites

- **Python 3.10+** - Make sure you have Python installed
- **SQLite** - Included with Python standard library
- **Terminal/Command Prompt** - For running the console application

### Dependencies

The application uses these Python packages:

- `sqlite3` - Database operations (built-in)
- `hashlib` - Password hashing (built-in)
- `getpass` - Secure password input (built-in)
- `tabulate` - Pretty table formatting (external)
- `datetime` - Date/time handling (built-in)

### Installation

1. **Clone or download** the project files
2. **Navigate** to the project directory:
   ```bash
   cd CrowdFundingPythonConsoleApp
   ```

3. **Install required packages**:
   ```bash
   pip install tabulate
   ```

4. **Run the application**:
   ```bash
   python main.py
   ```## 🎯 Usage Guide

### First Time Setup

1. **Start the application** by running `python main.py`
2. **Register a new account** (Option 1 from main menu)
   - Provide first name, last name, email, and Egyptian mobile number
   - Set a secure password (minimum 6 characters)
   - Note down your activation code
3. **Activate your account** (Option 2 from main menu)
   - Enter your email and activation code
4. **Login** (Option 3 from main menu)

### Managing Projects

Once logged in, you can:

#### Create a Project

- Enter project title and description
- Set funding target in EGP
- Define start and end dates
- Projects are automatically saved to the database

#### View Projects

- View all projects in the system
- Filter to see only your own projects
- Projects displayed in a clean table format with all details

#### Edit Your Projects

- Select from your existing projects
- Modify title, description, target, or dates
- Leave fields blank to keep current values

#### Delete Projects

- Choose a project to delete
- Type "DELETE" to confirm (safety measure)

### Search Features

- **Search by Start Date**: Find projects that begin within a specific date range
- **Search by End Date**: Find projects that end within a specific date range
- **Flexible Date Input**: Support for various date formats

## 🛠️ Technical Details

### Database Schema

**Users Table:**

- `id` - Primary key
- `first_name`, `last_name` - User's name
- `email` - Unique identifier (validated)
- `phone` - Egyptian mobile number format
- `password_hash`, `salt` - Secure password storage
- `activated` - Account activation status
- `activation_code` - Temporary activation code

**Projects Table:**

- `id` - Primary key
- `owner_id` - Foreign key to users table
- `title`, `details` - Project information
- `target` - Funding goal in EGP
- `start_date`, `end_date` - Project timeline
- `created_at` - Timestamp

### Security Features

- **Password Hashing**: Uses PBKDF2 with SHA-256 and random salt
- **Input Validation**: Email format and Egyptian phone number validation
- **SQL Injection Protection**: Parameterized queries
- **Account Activation**: Prevents unauthorized account creation

### Code Architecture

- **Modular Design**: Separated concerns across different modules
- **Clean Code**: Well-documented functions with type hints
- **Error Handling**: Comprehensive exception handling
- **User-Friendly**: Clear feedback and validation messages

## 🐛 Troubleshooting

### Common Issues

**"ModuleNotFoundError: No module named 'tabulate'"**

```bash
pip install tabulate
```

**Database errors**

- The SQLite database is created automatically in the `Data/` folder
- Ensure the `Data/` directory exists and is writable

**Phone number validation errors**

- Egyptian mobile numbers must be 11 digits
- Must start with 010, 011, 012, or 015
- Example: `01012345678`

**Date format errors**

- Supported formats: `YYYY-MM-DD` or `YYYY-MM-DD HH:MM`
- Example: `2025-12-31` or `2025-12-31 23:59`


## 📄 License

This project is created for education
## 👨‍💻 Author

**Muhammad**

- Created as part of Python programming coursework
- Demonstrates console application development with SQLite
