# 🎓 ITI Projects Repository

Welcome to my collection of projects developed during my training at the **Information Technology Institute (ITI)**. This repository showcases various technologies learned throughout the program, including Bash scripting, Python development, and Django web development.

## 📋 Project Overview

This repository contains three main projects demonstrating different aspects of software development:

| Project | Technology | Description | Status |
|---------|------------|-------------|---------|
| [Bash DBMS](#bash-database-management-system) | Bash Scripting | Complete database management system | ✅ Complete |
| [CrowdFunding Console App](#crowdfunding-python-console-app) | Python + SQLite | Console-based crowdfunding platform | ✅ Complete |
| [Django Web App](#django-web-application) | Django + Python | E-commerce web application | ✅ Complete |

---

## 🗄️ Bash Database Management System

**Location**: `Bash-DBMS-An-ITI-Project/`

A fully functional Database Management System implemented entirely in Bash scripting, featuring a responsive terminal interface that adapts to different screen sizes.

### Main Features

- Complete CRUD operations for databases and tables
- Data type validation (int, string)
- Primary key constraints
- Advanced search functionality
- Responsive UI with dynamic centering
- Beautiful ASCII table formatting

### Technical Implementation

- **Pure Bash Implementation**: No external dependencies
- **Responsive Design**: Adapts to terminal width using `tput`
- **Data Integrity**: Comprehensive validation and error handling
- **File-based Storage**: Efficient data storage using structured files

### Getting Started

```bash
cd Bash-DBMS-An-ITI-Project
chmod +x DBMS.sh
./DBMS.sh
```

**Created by**: Abdelrahman Bebars & Muhammad Gad

---

## 💰 CrowdFunding Python Console App

**Location**: `CrowdFundingPythonConsoleApp/`

A sophisticated console-based crowdfunding platform built with Python and SQLite, featuring user authentication, project management, and search capabilities.

### Core Features

- **User Management**: Registration, activation, and secure authentication
- **Project CRUD**: Create, read, update, and delete funding projects
- **Search System**: Date-based project discovery
- **Security**: PBKDF2 password hashing with salt
- **Data Validation**: Email and Egyptian mobile number validation

### Technical Architecture

- **Modular Architecture**: Clean separation of concerns
- **Database Integration**: SQLite with parameterized queries
- **Security First**: Secure password handling and SQL injection prevention
- **User Experience**: Tabulated output and cross-platform terminal support

### Installation & Usage

```bash
cd CrowdFundingPythonConsoleApp
pip install tabulate
python main.py
```

**Requirements**: Python 3.10+, tabulate package

---

## 🌐 Django Web Application

**Location**: `ITI-Django Lab/`

A full-featured Django web application demonstrating modern web development practices with multiple apps for different functionalities.

### Application Features

- **Multi-App Architecture**: Organized into specialized Django apps
- **User Authentication**: Login system with session management
- **Product Management**: Categories and product listings
- **Content Pages**: About Us and Contact Us functionality
- **Media Handling**: Image upload and management

### Application Structure

- **`products/`**: Product listings and management
- **`categories/`**: Product categorization system
- **`accounts/`**: User authentication and management
- **`aboutus/`**: About Us page functionality
- **`contactus/`**: Contact Us form and handling

### Django Implementation

- **Django Framework**: Leveraging Django's powerful features
- **Database Models**: Well-structured data relationships
- **Template System**: Dynamic HTML generation
- **Static Files**: CSS and media file management
- **Admin Interface**: Django admin for content management

### Setup Instructions

```bash
cd "ITI-Django Lab"
pip install django
python manage.py migrate
python manage.py runserver
```

**Requirements**: Django 4.x+, Python 3.8+

---

## 📄 License

These projects are created for educational purposes as part of the ITI (Information Technology Institute) training program. Feel free to use them for learning and reference.

---

**⭐ If you find these projects helpful, please consider giving this repository a star!**

---

Last updated: August 2025
