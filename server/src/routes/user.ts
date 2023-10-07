import express from 'express'
import getAuth from '../middleware/auth'
import usercontroller from '../controller/userContoller'

const router=express.Router()

 router.post('/register',usercontroller.register)
 router.post('/login',usercontroller.login)
 router.get("/auth", getAuth, (req, res)=>{
    res.status(200).json(req.auth)
})




export default router;