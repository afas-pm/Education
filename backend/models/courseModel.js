import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    topic: { type: String, required: true },
    durationMin: { type: Number, required: true },
    videoUrl: { type: String, required: true }
});

const lectureSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    durationMin: { type: Number, required: true },
    chapters: [chapterSchema]
});

const courseSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    category: { type: String, required: true },
    price: {
        original: { type: Number },
        sale: { type: Number }
    },
    isFree: { type: Boolean, default: false },
    overview: { type: String, required: true },
    lectures: [lectureSchema],
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const CourseModel = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default CourseModel;
