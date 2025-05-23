# CRUD Application with React and MongoDB

This is a full-stack CRUD application built with React, Node.js, Express, and MongoDB. It includes user authentication and a user management system.

## Features

- User registration and login
- JWT-based authentication
- User list view
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)
- npm or yarn

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/crud-app
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   npm run client
   ```

3. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user
- GET /api/users - Get all users (requires authentication)

## Technologies Used

- Frontend:
  - React
  - React Router
  - Axios
  - CSS

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT
  - bcryptjs 