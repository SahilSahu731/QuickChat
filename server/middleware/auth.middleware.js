import User from "../model/user..js";
import jwt from "jsonwebtoken";


export const protectRoute = async (req,res,next) => {
    try {
        const token = req.headers.token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select("-password");
        if (!user) {
            return res.status(401).json({ 
                success : false,
                message : "Unauthorized - No token provided"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Unauthorized - No token provided"
        })
    }
}