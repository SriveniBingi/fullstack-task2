💻 Full Stack Login & Dashboard System — (Task 2)
📘 Overview

This project is a Login and Dashboard System built as part of a Full Stack Development internship (Task 2).
It allows users to register, log in securely, and view a personalized dashboard interface.
The application is developed using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB, demonstrating end-to-end full-stack functionality.

🚀 Features

> 🔐 User Authentication: Secure login using email or phone and password
> 🧾 Token-Based Authentication (JWT): Generates secure tokens for session management
> 📊 Personalized Dashboard: Displays user details after successful login
> 💬 Instant Feedback: Login/registration messages appear directly on the screen (no popups)
> 🎨 Creative UI: Modern, aesthetic interface with animated curved backgrounds
> ⚙️ Backend API Integration: Connects frontend to MongoDB through Express.js server
> 🧠 Input Validation: Checks for valid email, phone, and password before submission
> 🧰 Technologies Used

**Frontend:**
> HTML5
> CSS3 (Custom & Tailwind CSS styling)
> JavaScript (Dynamic UI + Fetch API)

**Backend:**
> Node.js
> Express.js
>MongoDB with Mongoose
> JWT (JSON Web Token) for authentication
> bcrypt for password hashing
> dotenv for environment variable handling

📁 Folder Structure
fullstack-task2/
│
├── frontend/
│   ├── login.html
│   ├── dashboard.html
│   ├── style.css
│   ├── script.js
│   └── dashboard.js
│
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── User.js
│   └── .env
│
└── .gitignore

**⚙️ Setup Instructions**

1️⃣ Clone the Repository
           >>> git clone https://github.com/<your-username>/fullstack-task2.git
           >>> cd fullstack-task2
2️⃣ Install Backend Dependencies
           >>> cd backend
           >>> npm install
3️⃣ Configure Environment Variables
           >>> Create a .env file inside backend/ and add:
           >>> MONGO_URI=mongodb://127.0.0.1:27017/userAuthDB
           >>> JWT_SECRET=your_jwt_secret
           >>> PORT=5000
4️⃣ Start MongoDB
           >>> Make sure MongoDB is running locally:
           >>> mongod
5️⃣ Start the Backend Server
           >>> node server.js
6️⃣ Run the Frontend
          Open frontend/login.html in your browser to test login/registration flow.

**🧾 Database**

MongoDB stores registered users in the userAuthDB database.
You can view stored data using:

    >>>  use userAuthDB
    >>>  db.users.find().pretty()

**🧑‍💻 Developer**

Name: Sriveni Bingi
Role: MCA Student | Full Stack Developer
Task: Task 2 — Full Stack Login & Dashboard System

🏁 Outcome

This project demonstrates secure authentication, protected dashboard access, and backend integration using Node.js and MongoDB.
It showcases frontend–backend communication, data validation, and a clean, responsive design, completing the second milestone of the Full Stack internship.
