import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const TOKEN_EXPIRES_IN = '7d';

const createToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
};

// ... existing registerUser, loginUser, getCurrentUser, updateProfile, UpdatePassword ...

// GET MY COURSES
export async function getMyCourses(req, res) {
    try {
        const user = await User.findById(req.user.id).populate('enrolledCourses');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, courses: user.enrolledCourses, completedChapters: user.completedChapters });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// ENROLL IN COURSE
export async function enrollInCourse(req, res) {
    const { courseId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ success: false, message: "Already enrolled" });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        course.enrolledStudents.push(user._id);
        await course.save();

        res.json({ success: true, message: "Enrolled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// UPDATE CHAPTER PROGRESS
export async function updateChapterProgress(req, res) {
    const { chapterId, completed } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (completed) {
            if (!user.completedChapters.includes(chapterId)) {
                user.completedChapters.push(chapterId);
            }
        } else {
            user.completedChapters = user.completedChapters.filter(id => id !== chapterId);
        }
        await user.save();
        res.json({ success: true, completedChapters: user.completedChapters });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//REGISTER FUNCTION
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    try {
        if (await User.findOne({ email })) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = createToken(user._id);

        try {
            await sendEmail({
                email: user.email,
                subject: "Welcome to SkillForge!",
                message: `Hi ${user.name},\n\nWelcome to SkillForge! We are excited to have you on board.\n\nExplore our courses and start learning today.\n\nBest Regards,\nSkillForge Team`
            });
        } catch (emailError) {
            console.error("Welcome email failed:", emailError);
            // Don't fail registration if email fails
        }

        res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};

//LOGIN FUNCTION
export async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}

//GET CURRENT USER FUNCTION
export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select('name email role');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//UPDATE USER FUNCTION
export async function updateProfile(req, res) {
    const { name, email } = req.body;
    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please provide valid name and email" });
    }
    try {
        const exists = await User.findOne({ email, _id: { $ne: req.user.id } });

        if (exists) {
            return res.status(409).json({ success: false, message: "Email already in use" });
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true, select: 'name email' }
        );
        res.json({ success: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// FORGOT PASSWORD
export async function forgotPassword(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken field
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set expire time (15 minutes)
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetUrl} \n\nIf you have not requested this email then please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `SkillForge Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({ success: false, message: error.message });
    }
}

// RESET PASSWORD
export async function resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const jwtToken = createToken(user._id);

    res.status(200).json({
        success: true,
        user,
        token: jwtToken,
    });
}

//CHANGE PASSWORD FUNCTION
export async function UpdatePassword(req, res) {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "Please provide valid current and new password (at least 6 characters)" });
    }

    try {
        const user = await User.findById(req.user.id).select('password');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Current password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: "Password changed successfully" });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}