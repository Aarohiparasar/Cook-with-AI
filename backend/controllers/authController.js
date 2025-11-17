import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const SignUp = async (req, res) => {

    try {
        const { userName, email, password, confirmPassword } = req.body

        if (!userName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are requied' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password do not match' })

        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'email alredy exists' })
        }

        const existingUserName = await User.findOne({ userName })
        if (existingUserName) {
            return res.status(400).json({ message: 'userName alredy exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            await newUser.save();

            const token = jwt.sign(
                { id: newUser._id, userName: newUser.userName },
                process.env.JWT_SECRET,
                { expiresIn: "15d" }
            );

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            });

            res.status(201).json({
                message: "User registered successfully!",
                user: {
                    id: newUser._id,
                    userName: newUser.userName,
                    email: newUser.email,
                },
                token
            });
        }

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const Login = async (req, res) => {
    try {

        const { userName, password } = req.body

        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(400).json({ message: 'User Name do not exists' })
        }

        const matchPassword = await bcrypt.compare(password, user?.password)
        if (!matchPassword) {
            return res.status(400).json({ message: 'incorrect password' })
        }

        const token = jwt.sign(
            { id: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "user logged in successfully",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
