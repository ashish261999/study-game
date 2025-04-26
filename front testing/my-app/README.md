# 📚 Chapter Learning App

A **React-based** Learning Application where users can view topics, read learning material, practice the material, and complete chapters to progressively unlock new topics.

---

## ✨ Features

- 💖 View and read topic materials
- 🧠 Practice exercises after reading
- ✅ Mark chapters as complete
- 🔒 Lock/Unlock system for progressive learning
- 🔄 Dynamic refresh of topics after completing a chapter
- 🚀 Clean, modular, scalable project structure

---

## 📂 Project Structure

```
src/
├── api/
│   └── api.js          # Axios API requests
├── components/
│   ├── Sidebar.jsx     # Sidebar with list of topics
│   ├── TopicList.jsx   # Displays topics list
│   ├── MainContent.jsx # Displays Reading or Practice material
│   └── TopicContent.jsx# Reading and Practice display component
├── styles/
│   └── App.css         # Application styling
├── App.jsx             # Root Component
└── index.js            # App Entry Point
```

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite setup)
- **API Calls**: Axios
- **Backend (Expected)**: Spring Boot API (or any backend serving the `/api` endpoints)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Backend API running at `http://localhost:8080/api`

---

### Installation

```bash
# Step 1: Create a new Vite React project
npm create vite@latest chapter-learning-app -- --template react

# Step 2: Move into the project directory
cd chapter-learning-app

# Step 3: Install dependencies
npm install

# Step 4: Install Axios
npm install axios

# Step 5: Start the development server
npm run dev
```

---

### Environment Setup

Make sure your backend API is running locally and exposing these endpoints:

- `GET /api/topics/:playerId` → Fetch Topics List
- `GET /api/content/read/:topicId` → Fetch Reading Content
- `GET /api/content/practice/:topicId` → Fetch Practice Content
- `POST /api/complete/:playerId/:topicId` → Mark Chapter as Completed

---

## 📚 How It Works

1. **Topics** are fetched when the app loads.
2. Users can **select** an unlocked topic.
3. **Reading content** is shown first.
4. After reading, users click **"Done Reading"** ➞ Practice content is shown.
5. After practice, users click **"Complete Chapter"** ➞ Topic is marked completed.
6. New topics are unlocked, and the list **refreshes automatically**.

---

## 📈 Future Improvements

- 🌟 Add progress tracking (X% of course completed)
- 🔥 Gamify learning with badges and rewards
- 🎨 Implement Dark Mode toggle
- 🗕️ Add scheduling and reminders
- ✏️ Enable user notes per chapter
- 📊 Analytics on time spent per chapter
- 🔔 Push notifications for new topics

---

## 👌 Contributing

Want to contribute? Amazing!  
You can submit pull requests for:
- New features
- UI Improvements
- Bug fixes
- Code optimization

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Connect

- **Author**: Ashish Ranjan
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/ashish-ranjan-0b2b4b204/)
- **GitHub**: [Follow me](https://github.com/ashishranjanmahi07)

---

> *“Learn as if you were to live forever.” — Mahatma Gandhi*

---

# 🚀 Let's Build, Learn and Grow Together! 🚀

