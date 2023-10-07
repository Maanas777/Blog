import multer from 'multer';
import fs from 'fs';
import express from 'express';
import blog_controller from '../controller/blog_controller';
import getAuth from '../middleware/auth';

const router = express.Router();
router.use(express.json());

// Configure Multer for file uploads
var storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    // Check if the "uploads" directory exists, create it if not
    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads');
    }
    cb(null, './uploads');
  },
  filename: function (_req, file, cb) {
    // Remove special characters from the original filename
    var originalname = file.originalname.replace(/[^a-zA-Z0-9]/g, '');

    // Create a unique filename based on fieldname, timestamp, and original filename
    cb(null, file.fieldname + '_' + Date.now() + '_' + originalname);
  },
});

// Initialize Multer upload middleware
var upload = multer({
  storage: storage,
}).single('image');

// Define API routes with comments
router.get('/', getAuth, blog_controller.home); // Home route
router.post('/createBlog', getAuth, upload, blog_controller.createBlog); // Create a new blog route
router.delete('/deleteblog/:id', getAuth, blog_controller.deleteBlog); // Delete a blog by ID route
router.put('/updateblog/:id', getAuth, blog_controller.updateBlog); // Update a blog by ID route
router.get('/findblog/:id', getAuth, blog_controller.findBlog); // Find a blog by ID route
router.get('/downloadAll', blog_controller.downloadAllBlog); // Download all blogs in Excel or CSV route

export default router;
