🚀 User Management Dashboard (Full Stack Project)

A full-stack CRUD application built with React.js, Node.js, Express.js, and MySQL. It allows managing users from both a local database and an external API (JSONPlaceholder).

────────────────────────────

📌 Overview

This project demonstrates:
- Full-stack CRUD operations
- REST API integration
- External API data fetching
- Search & filtering
- Real-time UI updates

It manages:
✔ Database Users (MySQL)
✔ API Users (JSONPlaceholder)

────────────────────────────

✨ Features

📊 Dashboard
- Total users count (DB + API)

👤 User Management (CRUD)
- Add new user
- Update user
- Delete user
- Edit existing user

🔍 Search
- Search users by name (both DB + API)

🌐 API Integration
- Fetch users from JSONPlaceholder API

────────────────────────────

🛠️ Tech Stack

Frontend:
- React.js
- Tailwind CSS
- Axios
- React Icons

Backend:
- Node.js
- Express.js

Database:
- MySQL

────────────────────────────

📁 Project Structure

Frontend/
 ├── src/
 │   ├── App.jsx (Main Dashboard)
 │   ├── index.css
 │
Backend/
 ├── server.js
 ├── db.js
 ├── routes
 └── package.json

────────────────────────────

🗄️ Database Setup (MySQL)

Run this command:

CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255)
);

────────────────────────────

🔌 API Endpoints

GET     /users        → Get all users  
POST    /users        → Create user  
PUT     /users/:id    → Update user  
DELETE  /users/:id    → Delete user  

────────────────────────────

🚀 How to Run Project

Backend:
cd Backend
npm install
node server.js

Frontend:
cd Frontend
npm install
npm run dev

────────────────────────────

🔐 Notes

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:5173
- External API used: JSONPlaceholder

────────────────────────────

📄 License

This project is created for learning and educational purposes only.

────────────────────────────

👨‍💻 Developer

Karan Choudhary
Full Stack Developer
