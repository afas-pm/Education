import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import { isAuth } from "../middleware/isAuth.js";
import {
    addLectures,
    createCourse,
    deleteCourse,
    deleteLecture,
    getStats,
    addChapter,
    getAllUsers,
    updateRole,
    updateCourse
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, createCourse);
router.post("/course/:id", isAuth, isAdmin, addLectures);
router.put("/course/:id", isAuth, isAdmin, updateCourse);
router.post("/course/:courseId/:lectureId", isAuth, isAdmin, addChapter);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture", isAuth, isAdmin, deleteLecture);
router.get("/stats", isAuth, isAdmin, getStats);
router.get("/users", isAuth, isAdmin, getAllUsers);
router.put("/user/:id", isAuth, isAdmin, updateRole);

export default router;
