import express from 'express';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    UpdatePassword,
    getMyCourses,
    enrollInCourse,
    updateChapterProgress,
    forgotPassword,
    resetPassword
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

//PUBLIC LINKS
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

//PRIVATE LINKS
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, UpdatePassword);
userRouter.get("/my-courses", authMiddleware, getMyCourses);
userRouter.post("/enroll", authMiddleware, enrollInCourse);
userRouter.post("/progress", authMiddleware, updateChapterProgress);

export default userRouter;