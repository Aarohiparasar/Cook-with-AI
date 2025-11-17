import express from "express";
import {AuthMiddleware} from '../middleware/authMiddleware.js'
import GenerateRecipe from "../controllers/generateRecipeController.js";

const router = express.Router();

router.post("/generate", AuthMiddleware,GenerateRecipe);


export default router;
