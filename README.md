# 🚀 DevSync AI

DevSync AI is a full-stack AI-powered platform that helps software teams summarize their daily contributions (like Git commit messages), generate intelligent reports using LLMs, and view GitHub stats — all from a unified dashboard.

---

## 🎯 Features

- 🧠 AI Summary Generation using Hugging Face Mixtral model
- ⏳ Commit History + Summary Archive
- 📄 Word Document Report Download
- 👥 Team Summary Dashboard
- 📊 GitHub Profile Integration
- 🔐 JWT-based User Authentication
- 🌐 Dockerized Full-Stack Setup
- 🧪 Basic Unit Testing
- ✅ GitHub Actions CI/CD

---

## 🛠️ Tech Stack

| Layer         | Tech                          |
|---------------|-------------------------------|
| Frontend      | React   |
| Backend       | Flask (Python)                |
| Auth          | Flask-JWT-Extended            |
| AI Model      | Hugging Face Mixtral API      |
| Storage       | SQLite                        |
| DevOps        | Docker + Docker Compose       |
| CI/CD         | GitHub Actions                |

---

## 🧠 How It Works

1. User pastes commit messages or task updates.
2. Flask backend sends them to HuggingFace’s Mixtral model.
3. Receives a structured summary + creates a Word doc.
4. Frontend displays summary, history, GitHub stats, and team reports.

---

## 🖼️ Architecture Diagram

User ↔️ React Frontend ↔️ Flask API ↔️ HuggingFace Mixtral API
↘️ SQLite DB + Word Export

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.10+
- Node.js 18+
- Docker & Docker Compose (for containerized setup)

---

### 🐳 Run with Docker (Recommended)

docker compose up --build
Frontend: http://localhost:3000

Backend API: http://localhost:5000

### 🔨 Manual Local Setup
1. Backend Setup
cd backend
pip install -r requirements.txt
python app.py

2. Frontend Setup
cd frontend
npm install
npm start

### 🔐 Environment Variables
Backend .env
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_key
HUGGINGFACE_API_KEY=hf_xxxx...
Frontend .env
REACT_APP_BACKEND_URL=http://localhost:5000

✅ Sample Test (Optional)
Run the backend test:
cd backend
python -m unittest test_app.py
🚀 CI/CD via GitHub Actions
✅ CI/CD is enabled via .github/workflows/devsync-ci.yml:
Python + Node setup

Run tests and build both frontend/backend

### Docker build check

🐳 Docker Hub 
You can pull prebuilt images:

- Backend: [`hari245/devsync-ai-backend`](https://hub.docker.com/r/hari245/devsync-ai-backend)
- Frontend: [`hari245/devsync-ai-frontend`](https://hub.docker.com/r/hari245/devsync-ai-frontend)


docker pull hari245/devsync-ai-backend:latest
docker pull hari245/devsync-ai-frontend:latest


### 🎯 Intro Video
https://www.loom.com/share/bb63b1ab1ec4437da9c86f813ff8ee29?sid=90a032e6-0006-4485-a3ba-10be8e2f33f3
💻 Live Demo
https://www.loom.com/share/e772843c93424b4ba027c3d4e8c077fd?sid=eb178852-953e-4bea-b6d9-1e1c39c33399

### 🙌 Author
Harivignesh C K
B.Tech Artificial Intelligence and Data Science
GitHub: @Harivignesh024