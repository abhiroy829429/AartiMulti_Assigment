# Quiz App

A full-stack quiz application with a modern, colorful UI. Built with React, TypeScript, Tailwind CSS (frontend), and Node.js, Express, MongoDB (backend).

---

## Features

- User authentication (login/register)
- Take quizzes by category
- Instant results and answer review
- Leaderboard
- Beautiful, responsive UI

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abhiroy829429/AartiMulti_Assigment.git
cd aartimulti_services_assignment
```

---

### 2. Setup the Backend

1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your MongoDB connection in `.env` (or use the default in `index.js`).
4. (Optional) Seed the database with sample questions:
   ```bash
   node data/seed.js
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   The backend runs on [http://localhost:5001](http://localhost:5001).

---

### 3. Setup the Frontend

1. Open a new terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173).

---

## Usage

- Register or log in.
- Choose a quiz category and answer questions.
- See your results, review answers, and check the leaderboard.

---

## Project Structure

```
backend/    # Express API, MongoDB models, routes
frontend/   # React app, UI components, services
```

---

## Notes

- Make sure MongoDB is running and accessible.
- The API base URL is set to `http://localhost:5001/api` in the frontend services.
- For any issues, check your terminal for error messages.

---

