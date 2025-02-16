# Secure Task App

Welcome to the Secure and Interactive Web Application! This project is built using Node.js, EJS for the front-end, and MongoDB Atlas for the database. It implements secure practices for user authentication and task management, providing an interactive interface with dynamic views.

## Table of Contents

# Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [MongoDB Atlas Integration](#mongodb-atlas-integration)
- [Setting Environment Variables](#setting-environment-variables)
- [Running the Application Locally](#running-the-application-locally)
- [Deploying the Application to Heroku](#deploying-the-application-to-heroku)
- [API Endpoints Documentation](#api-endpoints-documentation)
  - [User Endpoints](#user-endpoints)
  - [Task Endpoints](#task-endpoints)
- [Error Handling](#error-handling)
- [Security Enhancements](#security-enhancements)
- [Conclusion](#conclusion)

  
## Technologies Used

*   **node.js**: JavaScript runtime for building the backend.

*   **express**: Web framework for building the API.
  
*   **mongodbAtlas**: Cloud-based MongoDB database service.
  
*   **mongoose**: A MongoDB object modeling tool for Node.js, which provides a straight-forward way to interact with your MongoDB database.
    
*   **axios**: HTTP client for making requests to the weather API.
    
*   **joi**: Data validation library.

*   **dotenv**: Loads environment variables from a .env file.

*   **bcryptjs**: A library to hash passwords for secure storage.

*   **nodemon**:  A development tool that monitors your Node.js application for changes and automatically restarts the server, saving you time.
    
## Project Structure

```bash
├── app.js                     # Main entry point of the application
├── config
│   ├── mongoose.js            # MongoDB configuration
│   ├── jwtMiddleware.js       # Middleware to verify JWT and role-based access control
├── controllers
│   ├── taskController.js      # Task CRUD logic
│   └── userController.js      # User registration, login, and authentication logic
├── models
│   ├── taskModel.js           # Mongoose schema for tasks
│   └── userModel.js           # Mongoose schema for users
├── routes
│   ├── userRoutes.js          # Routes for user API (login, signup)
│   └── taskRoutes.js          # Routes for task API (CRUD operations)
├── views
│   ├── index.ejs              # Home page (displays tasks)
│   ├── login.ejs              # Login page
│   ├── register.ejs           # Register page
│   └── createTask.ejs         # Create task page
├── .env                       # Environment variables (MongoDB URI, JWT secret)
├── package.json               # Project dependencies and scripts
└── package-lock.json          # Dependency lock file
```


## Setup and Installation

### Prerequisites

To run this project, you need the following:

*   **Node.js** (Recommended: version 18.x.x or later)

*   **MongoDB Atlas** (for database setup)
  
*   **Heroku account** (for deployment)

### Installation

1.  #### Clone the repository:

```bash
git clone https://github.com/your-username/secure-interactive-app.git
cd secure-interactive-app
```
2.  #### Install teh required dependencies:

```bash
npm install
```
### MongoDB Atlas Integration

Heroku doesn’t have access to local MongoDB instances, so you need to use **MongoDB Atlas** to create a remote database.

1. #### Create a free-tier MongoDB cluster on MongoDB Atlas [https://www.mongodb.com/products/platform/atlas-database]   
- Once installed, open MongoDB Compass on your local machine.
- Sign up or log in to your MongoDB Atlas account.
- Create a new project and cluster.
- Get the connection string for your MongoDB database.
2.  #### Set Up Your Database Connection:
- Update the .env file with the MongoDB connection URI:
```bash
MONGO_URI=mongodb+srv://your-user:your-password@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
```

### Setting Environment Variables

Create a `.env` file in the root directory of your project,and add the following values:

```env
MONGO_URI=mongodb+srv://your-user:your-password@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
PORT=5000
```
* Replace mydatabase and port number with your credentials

### Running the Application Locally

1.  #### Start the application locally:   
```bash
nodemon app.js
```
2.  #### Your app will now be available at `http://localhost:----`
*   Replace the port if needed.


### Deploying the Application to Heroku

#### Step 1: Install Heroku CLI

1.  #### Download and install the Heroku CLI.
2.  #### After installation, log in to your Heroku account:
```bash
heroku login
```

#### Step 2: Create a New Heroku App

1. ####  In your terminal, navigate to your project directory:
```bash
cd path/to/your/project
```
2.  #### Create a new Heroku app with a custom name:
```bash
heroku create your-app-name
```

#### Step 3: Set Environment Variables on Heroku

```bash
heroku config:set MONGO_URI="your-mongodb-atlas-uri"
heroku config:set JWT_SECRET="your-secret-key"
```

#### Step 4: Push Your Code to Heroku

1. ####  Add the Heroku remote repository:  
```bash
git remote add heroku https://git.heroku.com/your-custom-app-name.git
```
2. #### Push your code to Heroku: 

```bash
git push heroku main
```


#### Step 5: Open Your App

After deployment, open your app using the following command:
```bash
heroku open
```
You can also visit it directly at https://your-app-name.herokuapp.com.


## API Endpoints Documentation

### User Endpoints

- **POST /signup**
  - **Description**: Registers a new user with a hashed password.
  - **Request Body**:
    ```json
    {
        "name": "User Name",
        "email": "user@example.com",
        "password": "password123"
    }
    ```
  - **Response**: The added product's details.

- **POST /login**
  - **Description**: Logs in an existing user and returns a JWT token.
  - **Response**: A list of all products in the library.

- **PUT /update/:id**
  - **Description**: Update a specific product by its ID.
  - **Request Body**:
    ```json
    {
  "email": "user@example.com",
  "password": "password123"
  }
    ```
  - **Response**: The updated product's details.

---

### Task Endpoints

- **GET /tasks**
  - **Description**: etch all tasks for the authenticated user.
  - **Request Body**:
    ```json
    {
  "title": "Task Title",
  "description": "Task description",
  "status": "Pending"
  }
    ```
---


### Error Handling

If there are any errors, such as invalid product IDs, insufficient stock, or failed transactions, the application will return an appropriate error message with an HTTP status code.

Example error for transaction creation (e.g., insufficient stock):

```json
{
    "message": "Not enough stock available"
}
```

### Security Enhancements

#### Password Security
- Passwords are stored securely using bcryptjs

### Conclusion

This web application allows users to register, log in, and manage tasks. It uses EJS for dynamic front-end rendering and MongoDB Atlas for secure cloud storage. The app ensures secure practices like password hashing, JWT authentication, and data validation. Feel free to explore, customize, or extend the functionality as needed.

For testing, use tools like Postman or Insomnia to interact with the API endpoints.

