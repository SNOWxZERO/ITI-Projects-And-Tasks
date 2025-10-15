# 🎓 ITI Projects Repository

Welcome to my collection of projects developed during my training at the **Information Technology Institute (ITI)**. This repository showcases a comprehensive learning journey spanning shell scripting, Python development, web frameworks, containerization, orchestration, and infrastructure as code.

## 📋 Table of Contents

- [Dev Projects](#-core-projects)
  - [Bash Database Management System](#-bash-database-management-system)
  - [CrowdFunding Console App](#-crowdfunding-python-console-app)
  - [Django Web Application](#-django-web-application)
- [DevOps & Infrastructure Projects](#-devops--infrastructure-projects)
  - [Jenkins Final Project](#jenkins-final-project)
  - [Kubernetes Tasks](#kubernetes-tasks)
  - [Online Judge with ArgoCD](#online-judge-with-argocd)
  - [Prometheus Demo](#prometheus-demo)
  - [Terraform Final Project](#terraform-final-project)
- [License](#-license)

---

## 🚀 Dev Projects

### 🗄️ Bash Database Management System

**Location**: `Bash-DBMS-An-ITI-Project/`

A fully functional Database Management System implemented entirely in Bash scripting, featuring a responsive terminal interface that adapts to different screen sizes.

#### Features

- Complete CRUD operations for databases and tables
- Data type validation (int, string)
- Primary key constraints
- Advanced search functionality
- Responsive UI with dynamic centering
- Beautiful ASCII table formatting

#### Technical Highlights

- **Pure Bash Implementation**: No external dependencies required
- **Responsive Design**: Adapts to terminal width using `tput`
- **Data Integrity**: Comprehensive validation and error handling
- **File-based Storage**: Efficient data storage using structured files

#### Getting Started

```bash
cd Bash-DBMS-An-ITI-Project
chmod +x DBMS.sh
./DBMS.sh
```

**Created by**: Abdelrahman Bebars & Muhammad Gad

---

### 💰 CrowdFunding Python Console App

**Location**: `CrowdFundingPythonConsoleApp/`

A sophisticated console-based crowdfunding platform built with Python and SQLite, featuring user authentication, project management, and search capabilities.

#### Features

- **User Management**: Registration, activation, and secure authentication
- **Project CRUD**: Create, read, update, and delete funding projects
- **Search System**: Date-based project discovery
- **Security**: PBKDF2 password hashing with salt
- **Data Validation**: Email and Egyptian mobile number validation

#### Technical Architecture

- **Modular Design**: Clean separation of concerns with organized modules
- **Database Integration**: SQLite with parameterized queries to prevent SQL injection
- **Security First**: Secure password handling and input validation
- **Enhanced UX**: Tabulated output and cross-platform terminal support

#### Installation & Usage

```bash
cd CrowdFundingPythonConsoleApp
pip install tabulate
python main.py
```

**Requirements**: Python 3.10+, tabulate package

---

### 🌐 Django Web Application

**Location**: `ITI-Django Lab/`

A full-featured Django web application demonstrating modern web development practices with a multi-app architecture for different functionalities.

#### Features

- **Multi-App Architecture**: Organized into specialized Django apps for modularity
- **User Authentication**: Login system with session management
- **Product Management**: Categories and product listings with full CRUD
- **Content Pages**: About Us and Contact Us functionality
- **Media Handling**: Image upload and management system

#### Application Structure

- **`products/`**: Product listings and management
- **`categories/`**: Product categorization system
- **`accounts/`**: User authentication and management
- **`aboutus/`**: About Us page functionality
- **`contactus/`**: Contact form and message handling

#### Setup Instructions

```bash
cd "ITI-Django Lab"
pip install django
python manage.py migrate
python manage.py runserver
```

**Requirements**: Django 4.x+, Python 3.8+

---

## ⚙️ DevOps & Infrastructure Projects

### Jenkins Final Project

**Location**: `Jenkins-Final-Project/`

End-to-end CI/CD automation project demonstrating Jenkins integration with modern DevOps tools.

#### Components

- **Ansible Playbooks**: Automated configuration of Jenkins agents
- **Docker Images**: Custom Jenkins agent images with Dockerfiles
- **Terraform Examples**: Infrastructure provisioning automation
- **CI/CD Pipeline**: Complete automation workflow examples

#### Use Cases

- Automated agent provisioning and configuration
- Infrastructure as Code demonstrations
- CI/CD pipeline implementations

---

### Kubernetes Tasks

**Location**: `Kubernates Tasks/`

Structured learning path for Kubernetes with day-by-day exercises covering core concepts and practical implementations.

#### Structure

- **Day 1-5**: Progressive learning modules
- **Manifests**: Working examples for each concept
- **Exercises**: Hands-on practice tasks

#### Topics Covered

- Deployments and ReplicaSets
- Services (ClusterIP, NodePort, LoadBalancer)
- Ingress controllers and routing
- ConfigMaps and Secrets
- Persistent Volumes and Claims

---

### Online Judge with ArgoCD

**Location**: `Online-Judge-ArgoCD/`

GitOps demonstration project showcasing automated deployment using ArgoCD for an online judge platform.

#### Architecture

- **Frontend**: User interface deployment manifests
- **Backend**: API service configuration
- **Database**: MySQL deployment with persistent storage
- **Ingress**: Routing and load balancing setup
- **MetalLB**: Bare-metal load balancer configuration

#### Features

- GitOps workflow with ArgoCD
- Declarative application management
- Automated synchronization and deployment
- Complete secrets management

---

### Prometheus Demo

**Location**: `Prometheus/`

Observability and monitoring demonstration using Prometheus for metrics collection and visualization.

#### Components

- **Scraping Configurations**: Prometheus scrape configs and targets
- **Demo Application**: Sample app with exposed metrics
- **Monitoring Stack**: Complete setup for metrics collection

#### Purpose

- Introduction to observability practices
- Metrics collection and monitoring
- Foundation for building monitoring solutions

---

### Terraform Final Project

**Location**: `Terraform Final-Project/`

Comprehensive Infrastructure as Code project demonstrating Terraform best practices and complete infrastructure automation.

#### Structure

- **Provider Configuration**: Cloud provider setup and authentication
- **Modules**: Reusable infrastructure components
- **Variables**: Parameterized configuration
- **State Management**: Remote state configuration
- **Helper Scripts**: Automation and deployment utilities

#### Features

- Modular infrastructure design
- Reusable components and patterns
- Complete documentation and examples
- Production-ready configurations

---

## 📊 Technology Stack Summary

| Category | Technologies |
|----------|-------------|
| **Languages** | Bash, Python, JavaScript |
| **Frameworks** | Django |
| **Databases** | SQLite, MySQL |
| **DevOps** | Docker, Kubernetes, Jenkins, ArgoCD, Prometheus |
| **IaC** | Terraform, Ansible |
| **Monitoring** | Prometheus, MetalLB |

---

## 📄 License

These projects are created for educational purposes as part of the ITI (Information Technology Institute) training program. Feel free to use them for learning and reference.

---

## 🤝 Contributing

While these are primarily educational projects, suggestions and improvements are welcome. Feel free to open an issue or submit a pull request.

---

**⭐ If you find these projects helpful, please consider giving this repository a star!**

---

*Last updated: October 2025*
