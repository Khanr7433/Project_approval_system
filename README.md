# Project Approval System

The Project Approval System is a web application designed to streamline the process of project approvals. It consists of three main parts: frontend, backend, and admin.

## Project Structure

- **Frontend**: Handles user interactions and project submissions.
- **Backend**: Manages the business logic, database interactions, and API endpoints.
- **Admin**: Provides administrative functionalities for managing users and project approvals.

## Features

- User authentication and authorization
- Project submission and tracking
- Admin dashboard for managing approvals
- Notifications and alerts
- Reports and analytics

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project_approval_system.git
   cd project_approval_system
   ```

### Frontend

2. Navigate to the frontend directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

### Backend

4. Navigate to the backend directory and install dependencies:

   ```bash
   cd ../backend
   npm install
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Admin

6. Navigate to the admin directory and install dependencies:

   ```bash
   cd ../admin
   npm install
   ```

7. Start the admin development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to the frontend at `http://localhost:3000`.
2. Register a new account or log in with existing credentials.
3. Submit a new project for approval or manage existing projects from the dashboard.
4. For admin functionalities, navigate to `http://localhost:3000/admin` and log in with admin credentials.

## API Endpoints

### Backend Endpoints

#### User Authentication

- **POST /api/auth/register**

  - Request:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "userId": "string"
    }
    ```

- **POST /api/auth/login**
  - Request:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "token": "string",
      "userId": "string"
    }
    ```

#### Project Management

- **POST /api/projects**

  - Request:
    ```json
    {
      "title": "string",
      "description": "string",
      "userId": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Project submitted successfully",
      "projectId": "string"
    }
    ```

- **GET /api/projects**

  - Response:
    ```json
    [
      {
        "projectId": "string",
        "title": "string",
        "description": "string",
        "status": "string",
        "userId": "string"
      }
    ]
    ```

- **PUT /api/projects/:projectId**

  - Request:
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Project updated successfully"
    }
    ```

- **DELETE /api/projects/:projectId**
  - Response:
    ```json
    {
      "message": "Project deleted successfully"
    }
    ```

#### Admin Management

- **GET /api/admin/projects**

  - Response:
    ```json
    [
      {
        "projectId": "string",
        "title": "string",
        "description": "string",
        "status": "string",
        "userId": "string"
      }
    ]
    ```

- **PUT /api/admin/projects/:projectId/approve**

  - Response:
    ```json
    {
      "message": "Project approved successfully"
    }
    ```

- **PUT /api/admin/projects/:projectId/reject**
  - Response:
    ```json
    {
      "message": "Project rejected successfully"
    }
    ```

### Frontend Endpoints

#### User Actions

- **Register**

  - Endpoint: `POST /api/auth/register`
  - Request:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "userId": "string"
    }
    ```

- **Login**

  - Endpoint: `POST /api/auth/login`
  - Request:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "token": "string",
      "userId": "string"
    }
    ```

- **Submit Project**

  - Endpoint: `POST /api/projects`
  - Request:
    ```json
    {
      "title": "string",
      "description": "string",
      "userId": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Project submitted successfully",
      "projectId": "string"
    }
    ```

- **View Projects**
  - Endpoint: `GET /api/projects`
  - Response:
    ```json
    [
      {
        "projectId": "string",
        "title": "string",
        "description": "string",
        "status": "string",
        "userId": "string"
      }
    ]
    ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
