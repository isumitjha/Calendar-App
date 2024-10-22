Django-React Calendar App
=========================

This is a full-stack calendar application built using **Django** for the backend and **React** for the frontend. The app allows users to create, update, delete, and view events on a calendar with both monthly and weekly views. The backend is deployed using **Google Cloud Run** and the frontend is deployed using **Firebase Hosting** or **Google Cloud Storage**.

![HomePage](https://github.com/user-attachments/assets/1386e2f6-194a-414d-8012-608588a6e0fd)

Table of Contents
-----------------

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Tech Stack](#tech-stack)
-   [Setup and Installation](#setup-and-installation)
-   [Deployment](#deployment)
-   [Environment Variables](#environment-variables)
-   [How to Use](#how-to-use)

* * * * *

Features
--------

-   View events in both **monthly** and **weekly** views.
-   **CRUD functionality**: Users can create, update, delete events.
-   Integration with **Auth0** for secure authentication.
-   Deployed on **Google Cloud Platform** (Cloud Run for backend, Firebase/Google Cloud Storage for frontend).
-   Backend API is built with **Django REST Framework**.
-   **Google OAuth2** authentication for users to log in securely.

* * * * *

Project Structure
-----------------

```
Calendar-App/
│
├── Django_Backend/          # Django backend folder
│   ├── manage.py            # Django management file
│   ├── messages_api/        # Custom Django app for handling calendar events
│   ├── authz/               # Auth0 authentication logic
│   ├── common/              # Common utility functions
│   ├── Dockerfile           # Dockerfile for backend deployment
│   ├── gunicorn.conf.py     # Gunicorn configuration for production
│   └── requirements.txt     # Python dependencies
│
├── React_Frontend/          # React frontend folder
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Calendar, Profile, Home, etc.)
│   │   ├── services/        # Services to handle API requests
│   │   ├── app.js           # Main React component
│   │   └── index.js         # Entry point for the React app
│   ├── public/              # Static files like index.html
│   ├── package.json         # Node.js dependencies
│   └── .firebase/           # Firebase Hosting configuration (if applicable)
│
└── README.md                # Project README file
```

* * * * *

Tech Stack
----------

### Backend

-   **Django** (with **Django REST Framework**)
-   **SQLite** (or **PostgreSQL** for production)
-   **Gunicorn** (for production)
-   **Docker** (for containerization)

### Frontend

-   **React**
-   **Auth0** (for OAuth2 authentication)

### Deployment

-   **Google Cloud Run** (for backend)
-   **Firebase Hosting** or **Google Cloud Storage** (for frontend)

* * * * *

Setup and Installation
----------------------

### Prerequisites

-   Python 3.10+
-   Node.js 14+
-   Docker
-   Google Cloud SDK

### Backend Setup (Django)

1.  **Clone the repository** and navigate to the `Django_Backend` directory:

    `git clone https://github.com/isumitjha/Calendar-App.git
    cd Calendar-App/Django_Backend`

2.  **Create a virtual environment** and install dependencies:

    `python -m venv venv
    source venv/bin/activate  # For Windows: venv\Scripts\activate
    pip install -r requirements.txt`

3.  **Run the Django development server**:

    `python manage.py runserver 0.0.0.0:6060`

4.  **Setup Auth0**: Configure Auth0 keys in your `settings.py`.

### Frontend Setup (React)

1.  Navigate to the `React_Frontend` directory:

    `cd ../React_Frontend`

2.  **Install dependencies**:

    `npm install`

3.  **Run the React development server**:

    `npm start`

### Running the Full Application

Once both the Django and React development servers are running, the app will be accessible at:

-   **Frontend**: `http://localhost:4040`
-   **Backend**: `http://localhost:6060`

* * * * *

Deployment
----------

### Deploying Backend (Django) to Google Cloud Run

1.  **Build the Docker image**:

    `cd Django_Backend
    gcloud builds submit --tag gcr.io/[PROJECT_ID]/calendar-django-backend`

2.  **Deploy to Cloud Run**:

    `gcloud run deploy calendar-django-backend\
    --image gcr.io/[PROJECT_ID]/calendar-django-backend\
    --platform managed\
    --region [YOUR_REGION]\
    --allow-unauthenticated`

### Deploying Frontend (React) to Firebase Hosting

1.  **Build the React app**:

    `cd React_Frontend
    npm run build`

2.  **Deploy to Firebase**:

    `firebase init  # Select 'Hosting' and use the 'build/' directory
    firebase deploy`

Alternatively, you can deploy the static build to **Google Cloud Storage**.

* * * * *

Environment Variables
---------------------

For both the frontend and backend, you'll need to set environment variables to manage API keys and sensitive data.

### Backend (Django)

-   **AUTH0_DOMAIN**: Your Auth0 domain.
-   **AUTH0_CLIENT_ID**: Your Auth0 client ID.
-   **AUTH0_CLIENT_SECRET**: Your Auth0 client secret.
-   **CLOUD_SQL_CREDENTIALS**: If using Google Cloud SQL for the database.

### Frontend (React)

-   **REACT_APP_AUTH0_DOMAIN**: Auth0 domain for OAuth2.
-   **REACT_APP_AUTH0_CLIENT_ID**: Auth0 client ID.

These values should be set in `.env` files for local development and GCP secret manager for production.

* * * * *

How to Use
----------

1.  **Login** using Google OAuth (handled by Auth0).
2.  **View Events**: Use the calendar to view existing events.
3.  **Create, Update, or Delete Events**: Add or modify events by clicking on a date, editing the event form, and submitting.
4.  **Switch Views**: Toggle between monthly and weekly views on the calendar.

![CalendarPage](https://github.com/user-attachments/assets/769036ef-c786-477e-9e6a-76e23b066d71)   
