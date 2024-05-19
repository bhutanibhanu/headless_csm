# Headless CMS Project

This is a simple headless CMS built using Node.js for the backend and React for the frontend. It allows users to manage content types and their entries dynamically.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running this project, you need to have Node.js and npm installed on your machine. You also need a PostgreSQL database set up either locally or remotely.

### Installing

Follow these steps to get your development environment running:

1. **Clone the repository**

   ```bash
   git clone https://your-repository-url
   cd headless-cms

2. **Install backend dependencies**

Navigate to the backend directory and install the necessary packages:
cd backend
npm install

3. **Set up the database configuration**

Create a config.json file in the backend/config directory with the following content, adjusting the database credentials as necessary:

{
    "development": {
        "username": "your_db_username",
        "password": "your_db_password",
        "database": "your_db_name",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "your_db_username",
        "password": "your_db_password",
        "database": "your_db_name",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "your_db_username",
        "password": "your_db_password",
        "database": "your_db_name",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}

4. **Run database migrations**

Make sure to run the migrations to set up your database schema:

npx sequelize db:migrate

5. **Install frontend dependencies**

Navigate to the frontend directory and install the necessary packages:

cd ../frontend
npm install

6. **Start the backend server and Fronend Server**

npm start

This will start the backend server on http://localhost:3001.
This will start the Frontend server on http://localhost:3000.

**Usage**

Once both the frontend and backend are running, navigate to http://localhost:3000 in your browser to start using the application.




