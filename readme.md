# 🎵 Spotify Clone (Node.js + MongoDB)

## 🚀 Overview

This project is a **Spotify-inspired backend application** built using **Node.js, Express, and MongoDB**.
It provides APIs for user authentication, music handling, and basic streaming-related features.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Token)
* **Middleware:** Cookie Parser, CORS
* **File Upload (if used):** Multer

---

## 📁 Project Structure

```
src/
│
├── controllers/        # Business logic (auth, posts, etc.)
│   └── auth.controller.js
│   └── post.controller.js
│
├── models/             # Database schemas
│   └── user.model.js
│
├── routes/             # API routes
│   └── auth.route.js
│   └── post.route.js
│
├── db/                 # Database connection
│   └── db.js
│
├── app.js              # Express app configuration
│
server.js               # Entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/vedant128/spotify.git
cd spotify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## 🔐 Features

* ✅ User Registration & Login
* ✅ JWT Authentication
* ✅ Protected Routes
* ✅ Cookie-based Authentication
* ✅ MongoDB Integration
* ✅ REST API structure

---

## 📡 API Endpoints

### Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

### Post Routes

* `POST /api/post/create` → Create post

---

## 🔄 How Authentication Works

1. User logs in
2. Server generates JWT token
3. Token stored in cookies
4. Protected routes verify token
5. User data fetched from database

---

## 🧠 Learning Highlights

* Express middleware usage
* MVC architecture
* JWT authentication flow
* MongoDB schema design
* REST API development

---

## 📌 Future Improvements

* 🎧 Music streaming support
* 🎵 Playlist management
* ❤️ Like/Save songs
* 🔍 Search functionality
* ☁️ Cloud file storage (AWS / Cloudinary)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Vedant Gunjal
