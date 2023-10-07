import { Request, Response } from "express";
import UserModel from "../models/UserSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
// import getAuth from "../middleware/auth";
import dotenv from "dotenv"
dotenv.config()



const usercontroller = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);

      if (name && email && password) {
        console.log("hfidkfhksdfj")
      
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword)
        const user = await UserModel.create({
            name,
          email,
          password: hashPassword,
        });
        res
          .status(200)
          .json({ msg: "user registered successfully", user: user });
      } else {
        res.status(400).json({ msg: "please fill the required fields" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        const existUser = await UserModel.findOne({email})
        if(!existUser){
            return res.status(404).json({error: "user not found"})
        }
        
        const comparePassword = await bcrypt.compare(password, existUser.password)
        if(!comparePassword){
            return res.status(400).json({msg: "Wrong Credentials"})
        }
        
        const token = jwt.sign({id: existUser._id}, process.env.SECRET||'')
        res.status(201).json({msg: "user logged in", token: token})
    } catch (error) {
        res.status(400).json({error: error})
    }
},





  }


export default usercontroller;
