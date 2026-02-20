import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const isAuth = async (req, res, next) => {
    try {
        let token = req.headers.token;

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token)
            return res.status(403).json({
                message: "Please Login",
            });

        const decodedData = jwt.verify(token, JWT_SECRET);

        req.user = await User.findById(decodedData.id); // Changed _id to id based on your token payload

        next();
    } catch (error) {
        res.status(403).json({
            message: "Please Login",
        });
    }
};
