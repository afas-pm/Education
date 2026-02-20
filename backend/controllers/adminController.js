import CourseModel from "../models/courseModel.js"; // Using default import as verified before
import User from "../models/userModel.js";

export const createCourse = async (req, res) => {
    try {
        const { id, name, teacher, category, price, isFree, overview, image } = req.body;

        // Basic validation
        if (!id || !name || !teacher || !category || !overview || !image) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const course = await CourseModel.create({
            id,
            name,
            teacher,
            category,
            price,
            isFree,
            overview,
            image, // Assuming URL is passed
        });

        res.status(201).json({
            success: true,
            message: "Course Created Successfully",
            course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const addLectures = async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);

        if (!course)
            return res.status(404).json({
                message: "No Course with this id",
            });

        const { id, title, durationMin } = req.body; // Lecture details

        const lecture = {
            id,
            title,
            durationMin,
            chapters: [] // Start with empty chapters
        };

        course.lectures.push(lecture);

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture Added",
            course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);

        if (!course)
            return res.status(404).json({
                message: "No Course with this id",
            });

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: "Course Deleted Successfully",
            course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteLecture = async (req, res) => {
    try {
        const { courseId, lectureId } = req.query;

        const course = await CourseModel.findById(courseId);

        if (!course)
            return res.status(404).json({
                message: "No Course with this id",
            });

        course.lectures = course.lectures.filter((lecture) => {
            return lecture.id !== lectureId; // Assuming lecture.id is string
        });

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getStats = async (req, res) => {
    try {
        const totalCourses = await CourseModel.countDocuments();
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            stats: {
                totalCourses,
                totalUsers,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

// Add Chapter to Lecture
export const addChapter = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const { id, name, topic, durationMin, videoUrl } = req.body;

        const course = await CourseModel.findById(courseId);

        if (!course) return res.status(404).json({ message: "Course not found" });

        const lecture = course.lectures.find(l => l.id === lectureId);

        if (!lecture) return res.status(404).json({ message: "Lecture not found" });

        lecture.chapters.push({
            id,
            name,
            topic,
            durationMin,
            videoUrl
        });

        await course.save();

        res.status(200).json({
            success: true,
            message: "Chapter Added Successfully",
            course
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.role = req.body.role;
            await user.save();
            res.json({ message: "Role updated successfully", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const { name, teacher, category, price, isFree, overview, image } = req.body;

        if (name) course.name = name;
        if (teacher) course.teacher = teacher;
        if (category) course.category = category;
        if (price) course.price = price;
        if (isFree !== undefined) course.isFree = isFree;
        if (overview) course.overview = overview;
        if (image) course.image = image;

        await course.save();

        res.json({
            success: true,
            message: "Course Updated Successfully",
            course
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
