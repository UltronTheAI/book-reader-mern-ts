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

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/BasantaParajuli22/book-reader-mern-ts.git
cd book-reader-mern-ts
```

### 2. Navigate to Backend Directory
```bash
cd backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Configuration
Create your environment file by copying the example:
```bash
cp .env.example .env
```

Edit the `.env` file with your own values:
```env
# Database Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/book-reader-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5000

# Admin Account (Auto-created on first run)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin@example.com

```

#### 🔧 Getting Your MongoDB Connection String:
1. **Using MongoDB Atlas (Recommended for beginners):**
   - Sign up at [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster (free tier available)
   - Go to "Database Access" → Create a database user
   - Go to "Network Access" → Add your IP address (or 0.0.0.0/0 for development)
   - Click "Connect" → "Connect your application" → Copy the connection string
   - Replace `<username>`, `<password>`, and `<database>` with your values

2. **Using Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/book-reader-db
   ```

### 5. Start the Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

### 6. Verify Installation
Open your browser or API client and navigate to:
```
GET http://localhost:5000
```
You should see a success response confirming the server is running.

---

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run test` - Run tests (if available)

---

## 🔑 Default Admin Account

On first startup, an admin account is automatically created:
- **Email:** `admin@bookreader.com` (or your `ADMIN_EMAIL`)
- **Password:** `admin123` (or your `ADMIN_PASSWORD`)

**⚠️ Important:** Change the default admin credentials in production!

---

## 📁 Project Structure

```
backend/
├── src/
│   ├──config/
│   ├── controllers/     # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Helper functions
│   └── app.ts          # Express app configuration
├── .env.example        # Environment variables template
├── package.json
└── tsconfig.json
```
