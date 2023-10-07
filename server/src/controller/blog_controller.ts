import { Request, Response } from "express";
import Blog from "../models/BlogSchema";
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

// Define a custom property in the Express Request object
declare global {
    namespace Express {
      interface Request {
        userId?: string;
        title: string;
        content: string;
        createdAt: Date;
      }
    }
  }

const blogController = {
  // Retrieve all blogs and send as JSON
  home: async (_req: Request, res: Response) => {
    try {
      const blogs = await Blog.find()
        .populate("user", "-password")
        .sort("-createdOn");
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
  },
  
  // Create a new blog with title, content, and an image
  createBlog: async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const imageFile = req.file;
      console.log(imageFile);
      
      if (title && content && imageFile) {
        const blog = new Blog({
          title,
          content,
          image: {
            data: imageFile.buffer,         // Store the image buffer
            contentType: imageFile.mimetype, // Store the MIME type
          },
          user: req.userId,
        });
        await blog.save();
        res.status(200).json({ msg: "Blog created", blog });
      } else {
        res.status(400).json({ msg: "Title, content, or image missing" });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(400).json({ error });
    }
  },
  
  // Delete a blog by its ID
  deleteBlog: async (req: Request, res: Response) => {
    try {
      const blog = await Blog.findOneAndDelete({
        user: req.userId,
        _id: req.params.id,
      });
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json({ msg: "Blog deleted!" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Update a blog by its ID
  updateBlog: async (req: Request, res: Response) => {
    try {
      const { title, content, image } = req.body;
      const updatedBlog = await Blog.findOneAndUpdate(
        { user: req.userId, _id: req.params.id },
        { title, content, image },
        { new: true } 
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.status(200).json({ msg: "Blog updated", blog: updatedBlog });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Find a blog by its ID and populate user information
  findBlog: async (req: Request, res: Response) => {
    console.log("gdsgjkosdpgi");
    
    try {
      const blog = await Blog.findById(req.params.id).populate("user", "-password");

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Download all blogs in CSV format
  downloadAllBlog: async (_req: Request, res: Response) => {
    try {
      // Retrieve all blog entries from the database
      const blogs = await Blog.find();
  
      if (blogs.length === 0) {
        return res.status(404).json({ msg: 'No blogs found' });
      }
  
      const csvWriter = createObjectCsvWriter({
        path: 'blogs.csv', // Set the file name
        header: [
          { id: 'title', title: 'Title' },
          { id: 'content', title: 'Content' },
          { id: 'createdAt', title: 'Created At' },
        ],
      });
  
      const csvData = blogs.map((blog) => ({
        title: blog.title,
        content: blog.content,
      }));
  
      await csvWriter.writeRecords(csvData);
  
      res.setHeader('Content-Disposition', 'attachment; filename=blogs.csv');
      res.set('Content-Type', 'text/csv');
      const fileStream = fs.createReadStream('blogs.csv');
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default blogController;
