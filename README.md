# Blog

A blog management system with user authentication and CRUD (Create, Read, Update, Delete) functionality for blogs. The project is built using Node.js and MongoDB for the backend, with React.js for the frontend.

# Introduction
 Users can register and log in to create, edit, and delete their blogs. The blogs can include text content as well as images, and users can download all the blogs in CSV or Excel format. The system also includes user authentication to ensure that only authorized users can perform CRUD operations on their blogs.

# Project Technologies

- **Node.js**: Used as the server-side runtime environment.
- **Express.js**: Utilized as the web application framework for building RESTful APIs.
- **MongoDB**: Chosen as the database management system for storing and managing data.
- **TypeScript**: Implemented to add static typing and enhanced tooling to JavaScript.
- **React.js**: Used for building the frontend user interface.
- **bcrypt**: Employed for secure password hashing.
- **JSON Web Tokens (JWT)**: Used for user authentication and authorization.
- **csv-writer**: Employed for exporting blogs to CSV format.
- **multer**: Utilized for handling file uploads.
# Getting started

### Installation

To run this project locally, follow these steps:

   ```shell
git clone https://github.com/Maanas777/Blog.git
cd Blog

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../frontend
npm install

 Configuration

Create a .env file in the root directory of the project and add the following environment variables:
SECRET_KEY=your-secret-key

Usage
Start the development server:
npm start

Access the frontend in your browser:
http://localhost:3000

Frontend
The frontend is built using React.js and Next.js for server-side rendering. It provides a user-friendly interface for managing blogs.







