import { Request, Response } from "express";
import UserModel from "../models/UserSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const usercontroller = {
  
  // Register a new user
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (name && email && password) {
        // Hash the password before storing it
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const user = await UserModel.create({
          name,
          email,
          password: hashPassword,
        });

        res
          .status(200)
          .json({ msg: "User registered successfully", user: user });
      } else {
        res.status(400).json({ msg: "Please fill in the required fields" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error });
    }
  },

  // Login an existing user
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const existUser = await UserModel.findOne({ email });

      if (!existUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const comparePassword = await bcrypt.compare(password, existUser.password);

      if (!comparePassword) {
        return res.status(400).json({ msg: "Wrong credentials" });
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ id: existUser._id }, process.env.SECRET || "");

      res.status(201).json({ msg: "User logged in", token: token });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

export default usercontroller;
