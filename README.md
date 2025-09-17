# MERN Stack LMS

A Learning Management System built with MongoDB, Express.js, React, and Node.js.

## Project Structure

mern-lms/├── server/         # Backend (Node.js/Express/MongoDB)├── client/         # Frontend (React with Tailwind CSS)├── README.md

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Visual Studio Code
- Terminal access (VS Code integrated terminal recommended)

## Setup Instructions for Visual Studio Code

1. **Create Project Folder**:
   - Open VS Code.
   - Create a new folder named `mern-lms` in your workspace.
   - Inside `mern-lms`, create two subfolders: `server` and `client`.

2. **Set Up Backend**:
   - Copy all files from the `server/` section above into the `mern-lms/server/` folder.
   - Open the `mern-lms/server` folder in VS Code:
     - `File > Open Folder` and select `mern-lms/server`.
   - Create a `.env` file in `mern-lms/server/` based on `.env.example`:
     ```env
     MONGO_URI=mongodb://localhost:27017/mern_lms
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```
     - Replace `MONGO_URI` with your MongoDB connection string (local or Atlas).
     - Set a secure `JWT_SECRET` (e.g., a random string).
   - Open the integrated terminal in VS Code (`Terminal > New Terminal`).
   - Navigate to `server`: `cd server`.
   - Install dependencies: `npm install`.
   - Seed the database: `npm run seed`.
   - Start the backend: `npm start`.
   - The backend should run on `http://localhost:5000`.

3. **Set Up Frontend**:
   - Copy all files from the `client/` section above into the `mern-lms/client/` folder, maintaining the folder structure (`src/components/`, `src/pages/`, etc.).
   - Open the `mern-lms/client` folder in VS Code:
     - `File > Open Folder` and select `mern-lms/client`.
   - Open the integrated terminal in VS Code.
   - Navigate to `client`: `cd client`.
   - Install dependencies: `npm install`.
   - Start the frontend: `npm start`.
   - The frontend should run on `http://localhost:3000`.

4. **Access the Application**:
   - Open `http://localhost:3000` in your browser to access the frontend.
   - Use the following credentials to log in:
     - Admin: `admin@example.com` / `admin123`
     - Student: `student@example.com` / `student123`
   - Backend API is available at `http://localhost:5000/api`.

## Features
- **User Authentication**: Login, register, and logout with JWT-based authentication.
- **Role-Based Access**: Admin and student roles with protected routes.
- **Course Management**:
  - Create, update, delete courses (admin only).
  - View all courses and popular courses.
  - Search courses by title or instructor.
- **Success Stories**: Add and view success stories (admin only for adding).
- **Responsive UI**: Built with React and Tailwind CSS.
- **Admin Dashboard**: Add courses and success stories.
- **Seed Data**: Includes 2 users, 4 courses, and 2 success stories.

## Notes
- The `Enroll` button is a dummy action (logs to console) as per project requirements.
- The backend must be running for the frontend to work, as it relies on API calls.
- If MongoDB is not running locally, use MongoDB Atlas and update `MONGO_URI` in `server/.env`.
- The frontend assumes the backend is at `http://localhost:5000/api`. Update `client/src/api.js` if the backend URL changes.
- The edit course feature is partially implemented (links are present but no form). Extend `AdminDashboard.js` for full functionality.

## Troubleshooting
- **MongoDB Connection Error**: Ensure MongoDB is running (`mongod`) or use a valid MongoDB Atlas URI.
- **CORS Issues**: Verify `cors` is enabled in `server.js`.
- **Port Conflicts**: Change `PORT` in `server/.env` or `client/package.json` if 5000/3000 are in use.
- **Dependencies**: Run `npm install` again if you encounter module errors.

## Optional Deployment
- **Backend**: Deploy to Render/Heroku with MongoDB Atlas.
- **Frontend**: Deploy to Vercel/Netlify.
- Update `API_URL` in `client/src/api.js` to point to the deployed backend.

For further assistance, refer to the project requirements or contact the instructor.
