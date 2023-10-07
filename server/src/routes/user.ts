import express from 'express';
import getAuth from '../middleware/auth';
import usercontroller from '../controller/userContoller';

const router = express.Router();

// Register a new user route
router.post('/register', usercontroller.register);

// Login route
router.post('/login', usercontroller.login);

// Get authenticated user's information route
router.get('/auth', getAuth, (req, res) => {
  // Return the authenticated user's information
  res.status(200).json(req.auth);
});

export default router;
