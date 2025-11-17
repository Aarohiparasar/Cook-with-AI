import jwt from 'jsonwebtoken'
import { User } from "../Models/userModel.js";

export const AuthMiddleware = async(req,res,next)=>{
  
    try {
        const token=req.cookies.jwt
        if(!token){
            res.status(401).json({ error:"unauthorized: no token provided" });
        }
    
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            res.status(401).json({ error:"invalid token" });
        }
    
        const user=await User.findOne({userName:decoded.userName})
        if(!user){
            res.status(404).json({ error:"user not found" });
        }
    
        req.user=user
        next()
    } catch (error) {
        console.log(`Error in protectRoute:${error.message}`);
        res.status(500).json({ error: `internal server error ${error.message}` });
        next();
    }

}