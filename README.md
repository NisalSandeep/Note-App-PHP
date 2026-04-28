# 📒 Notes App

A simple CRUD notes app built with React, Tailwind CSS, DaisyUI, Axios, and PHP.

## Tech Stack

- **Frontend:** React + Tailwind CSS + DaisyUI
- **HTTP Client:** Axios
- **Backend:** PHP (no framework)
- **Database:** MySQL

## Getting Started

### Database

Run this SQL in phpMyAdmin:

```sql
CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Backend

1. Place the `backend/` folder in `htdocs/notes-app/`
2. Update your DB credentials in `db.php`
3. Start Apache and MySQL in XAMPP

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Features

- Create, view, edit, and delete notes
- Search notes by title or content
