import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import {connectDB} from './DB/db.js'
import authRoute from "./Routers/router.js"
import cookieParser from "cookie-parser";
import recipeRoutes from "./Routers/recipeRoutes.js";


const app=express()
dotenv.config()
app.use(cookieParser());


app.use(cors({
    origin:["https://cook-with-ai-two.vercel.app"],
    credentials: true
}))
app.use(express.json())

const PORT=process.env.PORT || 5002

connectDB()

app.use('/api/auth',authRoute)
app.use("/api/recipes", recipeRoutes);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})

