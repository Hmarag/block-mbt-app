# Block MBT - Full-Stack Startup Advisory Platform

<p align="center">
  <img src="/Upload/ChatGPT Image Feb 8, 2026, 12_25_43 PM.png" alt="Block MBT Logo" width="400"/>
</p>

---

<details>
<summary>🇬🇷 <strong>Για την Ελληνική έκδοση, κάντε κλικ εδώ</strong></summary>

## 📜 Περιγραφή

Το **Block MBT** είναι μια ολοκληρωμένη Full-Stack Web Εφαρμογή που σχεδιάστηκε για να παρέχει ψηφιακές και αυτοματοποιημένες συμβουλευτικές υπηρεσίες σε νεοφυείς επιχειρήσεις. Η πλατφόρμα προσφέρει στους χρήστες εργαλεία και καθοδήγηση, αξιοποιώντας τη δύναμη της τεχνητής νοημοσύνης για την παραγωγή προσωποποιημένων συμβουλών.

Το project αυτό αναπτύχθηκε από το μηδέν, καλύπτοντας ολόκληρο τον κύκλο ζωής της ανάπτυξης, από τον σχεδιασμό του backend API και της βάσης δεδομένων, μέχρι τη δημιουργία ενός δυναμικού frontend και το τελικό deployment σε cloud υποδομές.

## 🚀 Βασικά Χαρακτηριστικά

*   **Ασφαλής Αυθεντικοποίηση Χρηστών:** Σύστημα εγγραφής και σύνδεσης με email/password (JWT token-based) καθώς και μέσω Google (OAuth 2.0).
*   **Διαχείριση Λογαριασμού:** Λειτουργίες για επιβεβαίωση email και επαναφορά κωδικού πρόσβασης.
*   **AI-Powered Συμβουλές:** Ενσωμάτωση του OpenAI API για την παραγωγή έξυπνων και σχετικών συμβουλών προς τους χρήστες.
*   **Responsive User Interface:** Μοντέρνο και πλήρως responsive UI, χτισμένο με τη βιβλιοθήκη Mantine.
*   **RESTful Backend API:** Στιβαρό και ασφαλές API χτισμένο με FastAPI.
*   **CI/CD Pipeline:** Αυτοματοποιημένη διαδικασία deployment για το frontend (Vercel) και το backend (Render) μέσω Git.

## 🛠️ Τεχνολογίες (Tech Stack)

*   **Backend:** Python, FastAPI, PostgreSQL, JWT, Google OAuth, SendGrid, OpenAI
*   **Frontend:** React, TypeScript, Mantine, Axios
*   **Deployment:** Render (Backend), Vercel (Frontend), Git, GitHub

</details>

---

## 📜 Description (English)

**Block MBT** is a comprehensive Full-Stack Web Application designed to provide digital and automated advisory services for startups. The platform offers users a suite of tools and guidance, leveraging the power of Artificial Intelligence to generate personalized business advice.

This project was built from the ground up, covering the entire development lifecycle: from designing the backend API and database schema, to creating a dynamic frontend, and finally deploying the application to a production cloud environment.

## 🚀 Key Features

*   **Secure User Authentication:** Robust registration and login system using email/password (JWT token-based) and Google (OAuth 2.0).
*   **Account Management:** Includes features for email verification and password reset functionality.
*   **AI-Powered Advice:** Integrates the OpenAI API to generate intelligent and relevant business advice for users.
*   **Responsive User Interface:** A modern and fully responsive UI built with the Mantine component library.
*   **RESTful Backend API:** A scalable and secure API built with FastAPI.
*   **CI/CD Pipeline:** Automated deployment pipeline for the frontend (Vercel) and backend (Render) via Git.

## 🛠️ Tech Stack

### Backend
*   **Framework:** FastAPI
*   **Language:** Python
*   **Database:** PostgreSQL
*   **Authentication:** `python-jose` for JWT, `Authlib` for Google OAuth
*   **APIs:** SendGrid (Emails), OpenAI (AI)

### Frontend
*   **Framework:** React
*   **Language:** TypeScript
*   **UI Library:** Mantine
*   **HTTP Client:** Axios

### Deployment
*   **Backend Hosting:** Render
*   **Frontend Hosting:** Vercel
*   **Version Control:** Git & GitHub

## ⚙️ Installation & Setup

To run this project locally, follow the steps below.

### Prerequisites
*   [Node.js](https://nodejs.org/en/) (v18+)
*   [Python](https://www.python.org/downloads/) (v3.9+)
*   [PostgreSQL](https://www.postgresql.org/download/)
*   An `.env` file for your environment variables.

### 1. Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create a .env file and add the necessary keys
# (DATABASE_URL, SECRET_KEY, GOOGLE_CLIENT_ID, SENDGRID_API_KEY, etc.)

# 5. Start the server
uvicorn main:app --reload
```
The backend server will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

```bash
# 1. In a new terminal, navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create a .env.local file and add the backend API URL
# VITE_API_URL=http://127.0.0.1:8000

# 4. Start the application
npm run dev
```
The React application will be available at `http://localhost:5173`.
