# Subscription Service Application

This project is a production-ready subscription service application built using Node.js, Express, and MongoDB. It started as a YouTube tutorial project and has since been extended into a fully functional application ready for production.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Environment Configuration](#environment-configuration)
6. [Usage](#usage)
7. [Project Structure](#project-structure)
8. [Contributing](#contributing)
9. [License](#license)
10. [Acknowledgments](#acknowledgments)

## 1. Overview

This application was initially developed as part of a YouTube tutorial series. It has been enhanced into a production-ready application. It provides user authentication (registration, login, and sign-out) and subscription management (CRUD operations and renewal management).

## 2. Features

### User Authentication
- Registration with password hashing.
- Login with JWT-based authentication.
- Sign-out endpoint.

### Subscription Management
- Create, update, delete, and cancel subscriptions.
- Retrieve subscriptions by user and by subscription ID.
- List all subscriptions (admin view) and upcoming renewals.

### Security & Performance
- Uses Helmet for setting secure HTTP headers.
- Compression middleware for response compression.
- CORS enabled for cross-origin resource sharing.

## 3. Technologies Used

- [Express](https://expressjs.com/) - Web framework for Node.js.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For JWT authentication.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js.
- Other utilities: Helmet, Compression, CORS, Morgan, dotenv, bcrypt.

## 4. Installation

### Step 1: Clone the Repository

```bash
git clone git@github.com:maalwis/Subcription-tracking-API.git
cd subscription-service
```

### Step 2: Install Dependencies

```bash
npm install
```

## 5. Environment Configuration

Create two environment configuration files for development and production:

- `.env.development.local`
- `.env.production.local`

### Example content for `.env.development.local`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/subscriptiondb
JWT_SECRET=your_development_jwt_secret_key
NODE_ENV=development
```

### Example content for `.env.production.local`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/subscriptiondb
JWT_SECRET=your_production_jwt_secret_key
NODE_ENV=production
```

**Note:** Make sure to add these files to your `.gitignore` if they contain sensitive information.

## 6. Usage

### Development Mode
To run the application in development mode with automatic restarts:

```bash
npm run dev
```

### Production Mode
Set the appropriate environment variables (or use your `.env.production.local` file) and run:

```bash
npm start
```

The server will run on the port specified in your environment file (default is `5000`).

## 7. Project Structure

```
Subscription-tracking-API/
├── config/                       # Configuration files
│   ├── arcjet.js
│   ├── env.js
│
├── controllers/                  # Controllers for handling requests
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   ├── user.controller.js
│
├── database/                      # Database connection setup
│   ├── mongodb.js
│
├── middlewares/                   # Middleware functions
│   ├── arcjet.middleware.js
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── not-found.middleware.js
│
├── models/                        # Database models
│   ├── subscription.model.js
│   ├── user.model.js
│
├── node_modules/                  # Installed dependencies (ignored in Git)
│
├── routes/                        # API route definitions
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   ├── user.routes.js
│
├── .env.development.local         # Environment variables (development)
├── .env.production.local          # Environment variables (production)
├── .gitignore                     # Files to be ignored by Git
├── app.js                         # Entry point of the application
```

## Description of Key Directories

- **`config/`** → Configuration settings, such as API keys and environment variables.
- **`controllers/`** → Handles request logic and interacts with models.
- **`database/`** → Manages database connection settings.
- **`middlewares/`** → Custom middleware for authentication, error handling, etc.
- **`models/`** → Mongoose schemas and models for database interactions.
- **`routes/`** → Defines API endpoints and maps them to controllers.
- **`.env.*`** → Environment-specific configuration files (ensure they are in `.gitignore`).
- **`app.js`** → Main application file, initializes the server and middleware.
```

## 8. Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

## 9. License


## 10. Acknowledgments

Special thanks to the original tutorial creator and all contributors who helped improve this project!
