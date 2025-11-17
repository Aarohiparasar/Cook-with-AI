import express from "express";
import { SignUp, Login } from "../controllers/authController.js";
import {AuthMiddleware} from '../middleware/authMiddleware.js'
import { User } from "../Models/userModel.js";
import GenerateRecipe from "../controllers/generateRecipeController.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post('/login', Login)
router.get("/me", AuthMiddleware, async (req, res) => {
  
    try {
        
        const user=await User.findById(req.user?._id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(`Error in getMe controller:${error.message}`);
        res.status(500).json({ error: `internal server error ${error.message}` });
    }

});
router.post("/generate", AuthMiddleware,GenerateRecipe);


export default router;
