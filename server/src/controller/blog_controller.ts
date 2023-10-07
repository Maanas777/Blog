import { Request, Response } from "express";
import Blog from "../models/BlogSchema";
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';


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
 
  
  // ...
  
  createBlog: async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const imageFile = req.file;
      console.log(imageFile);
      
  
      if (title && content && imageFile) {
        // const imagePath = `./uploads/${Date.now()}_${imageFile.originalname}`;
        // fs.writeFileSync(imagePath, imageFile.buffer);
      
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

  updateBlog: async (req: Request, res: Response) => {
    try {
      const { title, content, image } = req.body;
      const updatedBlog = await Blog.findOneAndUpdate(
        { user: req.userId, _id: req.params.id },
        { title, content, image },
        { new: true } // To return the updated document
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.status(200).json({ msg: "Blog updated", blog: updatedBlog });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

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

  downloadAllBlog:async (_req: Request, res: Response) =>{
    
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
            // Add more fields as needed
          ],
        });
    
        const csvData = blogs.map((blog) => ({
          title: blog.title,
          content: blog.content,
        
          // Add more fields as needed
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
    }
  }



export default blogController;
