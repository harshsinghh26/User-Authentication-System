# User Authentication System

A secure user authentication system built using Node.js, Express, and MongoDB. This system ensures safe user registration, login, and session management using JWT authentication and encrypted passwords.

## Features
- **User Registration**: Saves user details in the database with hashed passwords using bcrypt.
- **Login System**: Authenticates users using email and password.
- **JWT Authentication**: Issues JSON Web Tokens (JWT) for secure session management.
- **Protected Routes**: Ensures only authenticated users can access specific endpoints.
- **Forgot Password Feature**: Implements a token-based password reset system for secure password recovery.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Tools**: Postman for API testing

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/user-auth-system.git
   cd user-auth-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=8000
   DB_URL=your_mongodb_connection_string
   CORS = your_cors_url
   ACCESS_TOKEN_SECRET = your_secret_key
   ACCESS_TOKEN_EXPIRY = set expiry
   REFRESH_TOKEN_SECRET = your_secret_key
   REFRESH_TOKEN_EXPIRY = set_expiry
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- **POST** `/api/v1/users/register` - Register a new user
- **POST** `/api/v1/users/login` - Login with email and password
- **POST** `/api/v1/users/logout` - Logout Current User
- **POST** `/api/v1/users/change-password` - Change password
- **POST** `/api/v1/users/forget-password` - Initiate password reset
- **POST** `/api/v1/users/refresh-token` - Refresh the Tokens

### Protected Routes (Require JWT Token)
- **GET** `/api/v1/users/profile` - Get user profile details

## Testing
Use **Postman** or any API client to test the endpoints.
