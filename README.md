# Project Title
## 🧠QuizQuest
# Description
A simple and interactive Quiz Web App built with React and Node.js. It lets users answer timed multiple-choice questions, tracks scores, and shows dynamic results based on performance.

# 🚀 Features
- ⌚ Countdown timer for each question
- ✅ Automatic feedback highlighting (correct/wrong answers)
- ➕ Automatic skip if time runs out
- 🔁 Restart quiz functionality
- 🎯  End quiz manually anytime
- 🏆 Results screen with performance-based messages and images
- 📡 Backend integration using Axios (connects to a Node.js API)

# 📸 Result Feedback System
## Based on your score:

| Score Range | Message                     | Image      |
|-------------|-----------------------------|------------|
| 7 or more   | And congrats!               | 🥇 Gold    |
| 5–6         | And nice                    | 🥈 Silver  |
| 2–4         | And passable                | 🥉 Bronze  |
| 1           | And sorry                   | 😔 Emoji   |
| 0           | You did not get any points! | 😢 Emoji   |


# 📁 Folder structure
```
/src
  └── /components
      ├── Home.jsx         # Main quiz logic
      └── home.module.css
  ├── App.jsx
  └── App.module.css
```

# 🧪 How to Run Locally
#  1. Clone the repo 
```
git clone https://github.com/andrewprecious/quiz-app.git
cd quiz-app
```
# 2. Install dependencies
Before installing and running the quizQuest web app backend, ensure that your system meets the following prerequisites:
## 💻 Operating System:
- Windows 10 or later, macOS, or Linux (should work on any OS that supports Node.js and React)
  
## ⚙ Prerequisites:
- Node.js (version 14.x or higher)
- npm (comes bundled with Node.js)
- React.js installed globally if you want to use create-react-app or similar tooling
  
## 📦 Libraries/Frameworks Used:
## 🔹 Frontend (React):
- axios – For making HTTP requests to the backend API
- CSS Modules – For component-scoped styles
- npm-run-dev - For starting the frontend

## 🔹 Backend (Node.js + Express):
- Express – Web framework for handling routes and middleware
- Mongoose – For interacting with MongoDB (used to store quizzes and questions)
- cors – To enable Cross-Origin Resource Sharing for frontend-backend communication
- dotenv – For securely managing environment variables (e.g., database URL, port)
- nodemon "your-js-file-name" – Automatically restarts server on file changes

## Development Tools:
- Code Editor: Visual Studio Code.

# 📌 Coming Soon
- ✍️ Quiz creation form (admin panel)










