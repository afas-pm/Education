import CourseModel from "../models/courseModel.js";

// @desc    Fetch all courses
// @route   GET /api/course
// @access  Public
const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Fetch single course
// @route   GET /api/course/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        let course;

        // Check if ID is a valid MongoDB ObjectId (24 char hex)
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            course = await CourseModel.findById(id);
        } else if (!isNaN(id)) {
            // Check if it's a numeric custom ID
            course = await CourseModel.findOne({ id: Number(id) });
        } else {
            return res.status(400).json({ success: false, message: "Invalid course ID format" });
        }

        if (course) {
            res.json({ success: true, course });
        } else {
            res.status(404).json({ success: false, message: "Course not found" });
        }
    } catch (error) {
        console.error("Error in getCourseById:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { getAllCourses, getCourseById };
