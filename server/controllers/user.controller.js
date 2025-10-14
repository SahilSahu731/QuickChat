import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const register = async (req,res) => {
    const {email,fullName,password, bio} = req.body;
    try {
        if (!email || !fullName || !password || !bio) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            email,
            password : hashedPassword,
            bio,
        })

        const token = generateToken(user._id);
        return res.status(201).json({
            success : true,
            message : "User registered successfully",
            userData : user,
            token
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success : false,
                message : "User does not exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success : false,
                message : "Invalid password"
            })
        }
        const token = generateToken(user._id);
        return res.status(200).json({
            success : true,
            message : "User logged in successfully",
            userData : user,
            token
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}

export const checkAuth = async (req,res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            success : true,
            message : "User is authenticated",
            user
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullName, bio, profilePic} = req.body;
        const userId = req.user._id;
        let updatedUser;
        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {fullName, bio}, {new : true})
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {fullName, bio, profilePic : upload.secure_url}, {new : true})
        }
        return res.status(200).json({
            success : true,
            message : "User profile updated successfully",
            user : updatedUser
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}