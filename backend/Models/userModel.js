import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
userName:{
    type:String,
    required:[true,"userName is required"],
    trim:true,
    minlength:3,
    unique:true
},
email:{
    type:String,
    required:[true,"email is required"],
    unique:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
},
password:{
    type:String,
    required:[true,"password is required"],
    minlength: 6,
},
},{timestamps:true})

export const User=mongoose.model("User",userSchema)