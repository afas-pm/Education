import mongoose from "mongoose";
import 'dotenv/config';
import User from "./models/userModel.js";

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "john@gmail.com";
        const user = await User.findOne({ email });

        if (user) {
            console.log("User Found:");
            console.log("ID:", user._id);
            console.log("Name:", user.name);
            console.log("Email:", user.email);
            console.log("Role:", user.role); // This is the critical part
        } else {
            console.log("❌ User not found with email: " + email);
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

checkUser();
