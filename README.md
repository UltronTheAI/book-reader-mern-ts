# 📚 Book Reader App – Node.js + Express + TypeScript

A **RESTful API backend** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** for a **Book Reader Application**. It supports user authentication, book/chapter/comment management, and like functionality with role-based access control.

---

## 🚀 Features

### 🔐 Authentication
- Users can **register** and **login** via email/password.
- **JWT-based** authentication and role-based authorization.
- Admin account auto-initialized during DB setup.

### 📚 Book Management
- **Admin-only**:
  - Full CRUD (Create, Read, Update, Delete) on books.
- **Public users**:
  - View all books.
  - Search/filter books by keyword, genre, or status.

### 📖 Chapter Management
- Each book can have multiple chapters.
- **Admin-only**:
  - Add, update, delete chapters.
  - Delete all chapters of a book.
- **Users**:
  - View individual chapters.
  - Navigate between chapters (previous/next).

### 💬 Comment System
- **Authenticated users** can:
  - Add comments to chapters.
  - Reply to other comments (threaded).
  - Update/delete their own comments.
  - Like/unlike comments.
- Support for comment filtering and soft/hard delete.

### ❤️ Like System
- Users can like/unlike:
  - Books
  - Chapters
  - Comments

---

## 🛠️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/BasantaParajuli22/book-reader-mern-ts.git
   cd book-reader-app
