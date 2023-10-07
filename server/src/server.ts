import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./connection/connection";
import UserRoutes from './routes/user'
import BlogRoutes from './routes/blog'



const PORT=process.env.port||5000


dotenv.config()
const app=express() 
connectDB();
app.use(express.json())
app.use(cors({credentials:true}))

app.use('/api/user',UserRoutes,)
app.use('/api/blog',BlogRoutes)




// app.get('/',(_req,res)=>{
//     res.send("hello")

// })






app.get('/',(_req,res)=>{
    res.send('Hello');
})

app.listen(PORT,()=>{
    console.log(`port started at ${PORT}`);
    
})