# Role Based Authorization System

A full-stack Role Based Authorization System built using React, Node.js, Express.js, MongoDB and JWT.

## Features

- User Registration
- User Login
- JWT Authentication
- Role Based Authorization
- Admin Dashboard
- User Dashboard
- Admin Allow/Block Users
- Admin Delete Users
- Password Hashing with bcrypt
- MongoDB Database

## Tech Stack

### Frontend
- React
- Axios
- React Hook Form
- Yup
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

- Role-Auth-Bakend
- Role-Auth-Frontend

## Run Backend

cd Role-Auth-Bakend
npm install
npm run dev

## Run Frontend

cd Role-Auth-Frontend
npm install
npm run dev

## Project Structure

Role-Auth-Project/
- Role-Auth-Bakend/
- Role-Auth-Frontend/

### Backend
- config/
- controllers/
- middleware/
- models/
- routes/
- utils/

### Frontend
- src/
- components/
- pages/
- services/

## Features

- User Registration and Login
- JWT Authentication
- Role Based Authorization
- Admin Dashboard
- User Dashboard
- Allow and Block Users
- Delete User
- Password Hashing
- MongoDB Integration

## API Overview

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Users
- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id
- PATCH /api/users/:id/allow
- PATCH /api/users/:id/block
- GET /api/users/profile

## Tech Stack

### Frontend
- React.js
- Axios
- React Hook Form
- Yup
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Tools
- Git
- GitHub
- Vite

## Installation and Setup

### Backend

cd Role-Auth-Bakend
npm install
npm run dev

### Frontend

cd Role-Auth-Frontend
npm install
npm run dev

### Environment Setup

Create a .env file inside Role-Auth-Bakend and add your MongoDB URI, JWT secret, and port configuration.

## Backend Documentation

The backend provides REST APIs for authentication and user management.

### Backend Responsibilities

- User registration and login
- JWT token generation
- Authentication middleware
- Role-based access control
- User management
- Admin authorization
- MongoDB database operations

### Backend Environment Variables

The backend uses the following environment variables:

- PORT
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRE

Use Role-Auth-Bakend/.env.example as a reference when creating the local .env file.

## Frontend Documentation

The frontend provides the user interface for authentication and role-based access.

### Frontend Responsibilities

- User registration interface
- User login interface
- JWT-based authentication handling
- Admin dashboard
- User dashboard
- User management interface
- API communication using Axios
- Form validation
- Success and error notifications

### Frontend Structure

The frontend contains reusable components, pages, authentication forms, and API services.

- src/components/ - Reusable UI components
- src/pages/ - Dashboard pages
- src/services/ - API communication
- src/Login.jsx - Login page
- src/Register.jsx - Registration page
- src/App.jsx - Main application component

## Security

This project follows common security practices for authentication and authorization.

### Security Measures

- Passwords are hashed using bcrypt before storing them.
- JWT tokens are used for authenticated requests.
- Protected routes require valid authentication.
- Role-based middleware restricts admin-only operations.
- Environment variables are used for sensitive configuration.
- Database credentials and JWT secrets are excluded from Git.
- .env files are ignored using .gitignore.

> Never commit real MongoDB credentials, JWT secrets, API keys, or other sensitive information to the repository.

## Development Guidelines

When contributing to this project, follow these basic guidelines:

- Keep frontend and backend responsibilities separated.
- Use meaningful names for files, functions, variables, and components.
- Keep authentication and authorization logic inside the appropriate middleware.
- Do not commit sensitive environment variables.
- Test changes locally before pushing them to GitHub.
- Keep dependencies updated when required.
- Write clear and descriptive commit messages.
- Avoid unnecessary changes to unrelated files.

### Git Workflow

1. Create or modify the required files.
2. Check the changes using git status.
3. Review changes before committing.
4. Create a meaningful commit.
5. Push the commit to the remote repository.

## Project Status

The project currently includes the core authentication and role-based authorization functionality.

### Completed

- User registration
- User login
- JWT authentication
- Role-based authorization
- Admin dashboard
- User dashboard
- User management
- MongoDB integration
- Protected API routes
- Project documentation
- Environment configuration examples

### Future Improvements

- Add automated tests
- Improve UI/UX
- Add refresh token support
- Add pagination for user management
- Add API documentation with Swagger
- Add deployment configuration
