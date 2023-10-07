import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./connection/connection";
import UserRoutes from './routes/user';
import Blogroutes from './routes/blog';

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware for parsing JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({ credentials: true }));

// Define routes for user and blog APIs
app.use('/api/user', UserRoutes);
app.use('/api/blog', Blogroutes);

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
