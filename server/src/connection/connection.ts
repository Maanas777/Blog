import mongoose from "mongoose";  ////mongodb connection

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Blog", {
    
    });
    console.log("Db connected");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};

export default connectDB;
