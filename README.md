# 💼 JobPortal — MERN Recruitment Platform

A modern full-stack recruitment platform built with the **MERN stack**, designed to connect job seekers with recruiters through a complete job discovery and application workflow.

🔗 **Live Demo:** https://jobportal-brown-five.vercel.app  
📦 **GitHub:** https://github.com/Mustee-coder/jobportal

---

## 🚀 Overview

JobPortal is a production-deployed recruitment platform where:

- Job seekers can discover and apply for jobs.
- Recruiters can create companies and publish job openings.
- Recruiters can review applicants and manage application statuses.
- Users can manage their profiles and upload resumes.
- Authentication is secured with JWT and HTTP cookies.
- Files such as resumes and company logos are uploaded through Cloudinary.

The project also includes automated **CI/CD checks for frontend and backend**, ESLint validation, production builds, and dependency security auditing.

---

## ✨ Features

### 👨‍💼 Job Seekers

- 🔐 User registration and login
- 🔎 Search and browse available jobs
- 📍 Filter jobs by location
- 💼 Filter jobs by job type
- 💰 View salary information
- 📄 View detailed job descriptions
- ⚡ Apply for jobs
- 📊 Track application status
- 📋 View application history
- 👤 Update profile information
- 📎 Upload resume
- ❤️ Like jobs
- 🔖 Save jobs
- 📱 Fully responsive interface

### 🏢 Recruiters / Admins

- 🔐 Secure recruiter authentication
- 🏢 Create company profiles
- 🖼️ Upload company logos
- ✏️ Edit company information
- 📝 Create job postings
- ✏️ Edit job postings
- 📋 View posted jobs
- 👥 View applicants for each job
- ✅ Accept applications
- ❌ Reject applications
- 📊 Manage recruitment workflow

---

## 🎨 UI & Design

JobPortal uses a modern **dark glassmorphism design system**.

### Design highlights

- 🌑 Dark gradient backgrounds
- 🪟 Glassmorphism cards
- 🎨 Indigo / purple gradient accents
- ✨ Framer Motion animations
- 🎯 Lucide React icons
- 📱 Responsive layouts
- ⚡ Interactive hover and transition effects

Example design:

```text
Background
└── Slate 950 → Slate 900 → Slate 950

Cards
└── Glass effect + backdrop blur + subtle borders

Primary Accent
└── Indigo → Purple gradient
🛠️ Tech Stack
Frontend
React
Vite
Redux Toolkit
React Router
Tailwind CSS
Framer Motion
Axios
Sonner
Shadcn/ui
Lucide React
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
Cookie-based authentication
Multer
Cloudinary
bcryptjs
DevOps & Deployment
Git
GitHub
GitHub Actions
ESLint
Vercel
Render
MongoDB Atlas
Cloudinary
🏗️ Architecture
                    ┌─────────────────────┐
                    │       Vercel        │
                    │      Frontend       │
                    │ React + Vite        │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │       Render        │
                    │       Backend       │
                    │ Node + Express       │
                    └──────┬───────┬──────┘
                           │       │
                 ┌─────────┘       └──────────┐
                 ▼                            ▼
        ┌─────────────────┐          ┌─────────────────┐
        │  MongoDB Atlas  │          │    Cloudinary   │
        │    Database     │          │ File Storage    │
        └─────────────────┘          └─────────────────┘
📁 Project Structure
jobportal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   │
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│   └── eslint.config.js
│
└── .github/
    └── workflows/
        ├── frontend-ci.yml
        └── backend-ci.yml
🔌 API
Authentication
Base URL
/api/v1/user
Method
Endpoint
Description
POST
/register
Create a new account
POST
/login
Authenticate user
GET
/logout
Logout user
POST
/profile/update
Update profile
Jobs
Base URL
/api/v1/job
Method
Endpoint
Description
POST
/post
Create a job
GET
/get
Get available jobs
GET
/getadminjobs
Get recruiter's jobs
GET
/get/:id
Get job details
PUT
/update/:id
Update a job
Applications
Base URL
/api/v1/application
Method
Endpoint
Description
GET
/apply/:id
Apply for a job
GET
/get
Get user's applications
GET
/:id/applicants
Get job applicants
POST
/status/:id/update
Update application status
Example:
{
  "status": "Accepted"
}
Supported statuses:
Pending
Accepted
Rejected
Companies
Base URL
/api/v1/company
Method
Endpoint
Description
POST
/register
Create company
GET
/get
Get recruiter's companies
GET
/get/:id
Get company details
PUT
/update/:id
Update company
🔐 Authentication & Security
The backend uses:
JWT authentication
HTTP cookies
Protected routes
Password hashing with bcryptjs
Environment variables for secrets
CORS configuration
File upload handling with Multer
Cloudinary for uploaded files
ESLint validation
npm audit security checks
Current dependency security status:
npm audit
0 vulnerabilities
🔄 Application Workflow
Job Seeker
    │
    ├── Register / Login
    │
    ├── Browse Jobs
    │
    ├── View Job
    │
    ├── Apply
    │
    ▼
Application Created
    │
    ▼
Recruiter Reviews Applicant
    │
    ├── Accept
    │
    └── Reject
    │
    ▼
Job Seeker Sees Updated Status
⚙️ Getting Started
Prerequisites
Make sure you have:
Node.js 18+
MongoDB Atlas account
Cloudinary account
Git
1. Clone Repository
git clone https://github.com/Mustee-coder/jobportal.git

cd jobportal
2. Frontend Setup
cd frontend

npm install

npm run dev
Frontend runs on:
http://localhost:5173
3. Backend Setup
Open another terminal:
cd backend

npm install

npm run dev
Backend runs on:
http://localhost:3000
🔑 Environment Variables
Frontend
Create:
frontend/.env
VITE_API_URL=http://localhost:3000
Backend
Create:
backend/.env
PORT=3000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
Never commit .env files or API secrets to GitHub.
🧪 Quality Checks
Before pushing changes:
Frontend
cd frontend

npm run lint
npm run build
Backend
cd backend

npm run lint
npm audit
The project uses GitHub Actions to automatically validate frontend and backend changes.
Git Push
   │
   ▼
GitHub Actions
   │
   ├── Frontend Lint
   ├── Frontend Build
   ├── Backend Lint
   └── Security Audit
   │
   ▼
   ✅ Green
☁️ Deployment
Service
Platform
Frontend
Vercel
Backend
Render
Database
MongoDB Atlas
File Storage
Cloudinary
CI/CD
GitHub Actions
Live Application
🚀 https://jobportal-brown-five.vercel.app⁠�
🗺️ Roadmap
Future improvements may include:
[ ] Email notifications
[ ] Advanced salary filtering
[ ] Experience-level filtering
[ ] Recruiter analytics
[ ] Persistent saved jobs
[ ] In-app messaging
[ ] Real-time notifications
[ ] Job recommendations
[ ] Pagination and advanced search
📸 Screenshots
Add screenshots here to showcase the application.
docs/
└── screenshots/
    ├── home.png
    ├── jobs.png
    ├── job-details.png
    ├── recruiter-dashboard.png
    └── applicants.png
👨‍💻 Author
Mujittapha Magaji (Muji)
Full-Stack / MERN Developer focused on building modern, scalable web applications.
GitHub:
https://github.com/Mustee-coder⁠�
Portfolio:
Coming soon
📄 License
This project is proprietary software developed by Mustee Digital Labs.
Unauthorized commercial use, redistribution, or resale is not permitted.
