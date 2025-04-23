# 📝 Blogging Platform API

Welcome to the **Blogging Platform API**, a feature-rich RESTful backend built with **Node.js**, **Express**, and **MySQL**. This application serves as the backend infrastructure for a modern blogging website, providing robust support for posts, comments, likes, user authentication, and more.

---

## 🚀 Features

- ✅ **User Authentication & Authorization**
  - JWT-based login/register system
  - Email verification
  - Password reset and recovery
  - Profile management (bio, username, pictures)
  - Account activation/deactivation

- ✍️ **Blog Post Management**
  - Create, read, update, delete (CRUD) posts
  - Associate posts with tags and categories
  - Share posts via link

- 💬 **Comments and Likes**
  - Nested comment system
  - Like/unlike any post or comment

- 🔔 **Notifications**
  - Real-time styled notifications (likes, comments, etc.)
  - User-specific notifications
  - Notification settings

- 📚 **Tags and Categories**
  - Custom tagging system for better post organization
  - CRUD support for tags and categories

- 🔒 **Secure Sessions**
  - Session and token handling
  - Route protection with middleware

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Utilities**: Nodemailer, dotenv, helmet, morgan, cors

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection
   JWT_SECRET=your_secret_key
   EMAIL_USERNAME=you@example.com
   EMAIL_PASSWORD=yourpassword
   BASE_URL=http://localhost:5000
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```

---

## 📬 API Endpoints Overview

> Base URL: `http://localhost:5000/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password/:token`

### Posts
- `POST /posts`
- `GET /posts/:id`
- `PUT /posts/:id`
- `DELETE /posts/:id`

### Comments
- `POST /comments`
- `GET /comments/:postId`

### Likes
- `POST /likes/toggle`

### Tags & Categories
- `GET /tags`
- `GET /categories`

> ...and many more!

---

## 📌 Future Enhancements

- Add WebSocket support for real-time notifications
- Dashboard for users to track analytics
- Public-facing API documentation with Swagger
- File uploads via AWS S3 or Cloudinary

---

## 📄 License

This project is licensed under the MIT License.


