import mongoose from "mongoose";
import 'dotenv/config';
import User from "./models/userModel.js";

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "admin@gmail.com";
        const user = await User.findOne({ email });

        if (user) {
            user.role = "admin";
            user.name = "Admin";
            await user.save();
            console.log("✅ User updated successfully!");
            console.log("Name: " + user.name);
            console.log("Role: " + user.role);
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

updateAdmin();
