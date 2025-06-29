# 🎬 Netflix Clone

## 🚀 Live Demo

🌐   https://movie-stream-clone-49325.firebaseapp.com

![image](https://github.com/user-attachments/assets/9e4642fa-fe96-483b-9790-cbf3f7e17ef4)


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
![image](https://github.com/user-attachments/assets/cd273541-9308-4961-8a94-0e0f2309ac4b)
![image](https://github.com/user-attachments/assets/f210f549-2f56-4226-a995-a405c1831241)
![image](https://github.com/user-attachments/assets/977887e3-5bf4-4599-b38a-115b70fff997)




🤝 Contributing
Contributions are welcome!
Feel free to open issues and pull requests for improvements or features.

---

📫 Contact
💼 LinkedIn: https://www.linkedin.com/in/venkat-sunkara/
📧 Email: venkatsunkara9959@gmail.com

