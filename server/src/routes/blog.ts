// import Blog from "../models/BlogSchema";
import multer from 'multer'
import fs from 'fs'
// import path from 'path';
import express from "express";
import blog_controller from '../controller/blog_controller'
import getAuth from "../middleware/auth";
// import { get } from 'http';

const router=express.Router()
router.use(express.json())




var storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      // make sure directory exists
      if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads");
      }
      cb(null, "./uploads");
    },
    filename: function (_req, file, cb) {
      // remove spaces and special characters from original filename
      var originalname = file.originalname.replace(/[^a-zA-Z0-9]/g, "");
      // set filename to fieldname + current date + original filename
      cb(null, file.fieldname + "_" + Date.now() + "_" + originalname);
    },
  });
  var upload = multer({
    storage: storage,
  }).single('image');




router.get('/',getAuth,blog_controller.home)
router.post('/createBlog',getAuth,upload,blog_controller.createBlog)
router.delete('/deleteblog/:id',getAuth,blog_controller.deleteBlog)
router.put('/updateblog/:id',getAuth,blog_controller.updateBlog)
router.get('/findblog/:id',getAuth,blog_controller.findBlog)
router.get('/downloadAll',blog_controller.downloadAllBlog)



export default router;