# Hostel Management System

This repository contains the **Hostel Management System project** developed for a **DBMS course project**. The system is designed to manage hostel operations such as student records, room allocation, maintenance requests, visitor logs, and fee management.

The project is divided into **frontend and backend components** so that different team members can work on them separately.

---

## Project Structure

```
hostel-management-system
│
├── hostel-management
│   ├── login.html
│   ├── index.html
│   │
│   ├── css
│   │   └── style.css
│   │
│   ├── js
│   │   ├── app.js
│   │   └── data.js
│   │
│   └── pages
│       ├── students.html
│       ├── rooms.html
│       ├── maintenance.html
│       ├── visitors.html
│       └── fees.html
│
├── backend
│   └── (Backend implementation will be added here)
│
└── README.md
```

---

## Frontend Features

The frontend interface includes the following modules:

### Login Page

Admin login interface to access the system.

### Dashboard

Displays summary information such as:

* Total Students
* Available Rooms
* Pending Maintenance
* Fees Pending

### Student Management

View and search student information.

### Room Management

View room capacity, occupancy, and availability.

### Maintenance Requests

Track hostel maintenance issues.

### Visitor Log

Record visitor entries and exit times.

### Fee Management

Track student fee payment status.

---

## Technologies Used

* HTML
* CSS
* JavaScript
* Font Awesome (for icons)

---

## How to Run the Frontend

1. Clone the repository

```
git clone https://github.com/josnajoshy/hostel-management-system.git
```

2. Open the project in **VS Code**

3. Run the frontend using **Live Server**

Right click `login.html` and select **Open with Live Server**

---

## Backend Development

The backend team will implement:

* Database connection using **MySQL**
* API endpoints for data handling
* CRUD operations for:

  * Students
  * Rooms
  * Maintenance
  * Visitors
  * Fees

Example backend structure:

```
backend
│
├── server.js
├── database.js
└── routes
```

---

## Project Purpose

The goal of this project is to demonstrate the design and development of a **Hostel Management System using a database-driven architecture** as part of the DBMS coursework.

---

## Team Collaboration

The project is divided into:

* **Frontend Team** → UI development (HTML, CSS, JS)
* **Backend Team** → Database and API development (MySQL + server-side code)
