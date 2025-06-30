# 🎬Movie Stream -- Netflix Clone

A **Netflix-inspired movie streaming clone** built with **React (Vite) + Firebase**, allowing users to **sign up, sign in, and browse movies using the TMDB API**.

---
## 🚀 Live Demo

🌐 https://moviestream-clone.web.app/

---

![image](https://github.com/user-attachments/assets/0c0da2f5-b2a2-4ac8-ab0e-b242c41d47be)

---

## 📌 Overview

A **Netflix Clone** built with **React 19 + Vite + Firebase**, allowing users to:

✅ Sign up and sign in using Firebase Authentication.  
✅ Browse movies fetched dynamically from the **TMDB API**.  
✅ Enjoy a **responsive, modern Netflix-like UI** across devices.  
✅ Experience fast performance using **Vite** for builds.  
✅ Deployed live using **Firebase Hosting**.

---

## 🛠️ Features

✅ **User Authentication** with Firebase Auth.  
✅ Fetch and display movie data dynamically from TMDB.  
✅ Uses `react-firebase-hooks` for clean authentication management.  
✅ Toast notifications using `react-toastify`.  
✅ Responsive, clean UI with **React Icons** integration.  
✅ Routing with `react-router-dom`.

---

## ⚙️ Tech Stack

- **Frontend:** React 19, Vite 6
- **State/Effects:** React Hooks
- **Auth:** Firebase Authentication
- **Deployment:** Firebase Hosting
- **API:** The Movie Database (TMDB)

---

## 🚀 Getting Started Locally

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
```

2️⃣ Install dependencies:

```bash
npm install
```
3️⃣ Add your Firebase configuration:

In your src/firebase.js, add:
```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

4️⃣ Run locally:

```bash
npm run dev
```

5️⃣ Build for production:

```bash
npm run build
```

🧩 TMDB API Setup
1️⃣ Sign up on TMDB.
2️⃣ Obtain your API Key.
3️⃣ Use it in your project where you fetch movie data.

💻 Deployment
This project uses Firebase Hosting:

Build your project:

```bash
npm run build
```
Deploy using Firebase CLI:

```bash
firebase deploy
```
📸 Screenshots
![image](https://github.com/user-attachments/assets/01dfe7bf-0928-48ca-a23e-c4727dd61f11)

---


![image](https://github.com/user-attachments/assets/f4633a38-cc2c-45ce-a06e-732d338d72d5)


---


🤝 Contributing
Contributions are welcome!
Feel free to open issues and pull requests for improvements or features.

---

📫 Contact

💼 LinkedIn: https://www.linkedin.com/in/venkat-sunkara/
📧 Email: venkatsunkara9959@gmail.com

