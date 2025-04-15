# 🟢 OdinChat Frontend

This is the **frontend** of **OdinChat**, a real-time chat application built as part of [The Odin Project](https://www.theodinproject.com/) curriculum. It allows users to chat in real time, manage dms, and experience live interaction — all from a sleek, responsive interface.

> 🔗 [Backend Repo](https://github.com/devashishchakraborty/odinchat-backend)  
> 🌐 [Live Demo](https://your-live-url.com)
---

## ✨ Features

- 🧑‍💻 User login, registration, and logout
- 💬 Real-time private chat via Socket.IO
- ⚡ Live message updates
- 🎨 Responsive and modern UI (mobile-friendly)

---

## 🔧 Built With

- **React** (with [Vite](https://vitejs.dev/))
- **Tailwind CSS** 
- **Socket.IO Client**
- **React Router**

---


## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/devashishchakraborty/odinchat.git
cd odinchat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root and add:

```env
VITE_API_BASE_URL="http://localhost:3000"
```

Update the URL based on your backend deployment/local setup.

### 4. Run the App

```bash
npm run dev
```

App will run at `http://localhost:5173` by default.

---

## 🔐 Auth Flow Overview

- Register or log in with email & password
- JWT token is stored in local storage
- Protected routes based on auth context
- Socket connection is initialized post-authentication

---

## 🧠 Future Enhancements

- Group Chat
- Chat history and search
- Emojis, file sharing, and reactions
- User profile pages and avatars
- Notifications and sound alerts
