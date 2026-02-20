import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    completedChapters: [{
        type: String // We'll store chapter IDs here
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;