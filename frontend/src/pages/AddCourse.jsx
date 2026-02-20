import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const AddCourse = () => {
    const { token, backendUrl } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [teacher, setTeacher] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [overview, setOverview] = useState("");
    const [image, setImage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/course/new`,
                {
                    id: Number(id),
                    name,
                    teacher,
                    category,
                    price: { sale: Number(price) },
                    isFree: Number(price) === 0,
                    overview,
                    image,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success(data.message);
            setLoading(false);
            navigate("/admin/courses");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add course");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl">
            <button
                onClick={() => navigate("/admin/courses")}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Courses
            </button>

            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Create New Course
            </h1>

            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Course ID (Number)</label>
                            <input
                                type="number"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="e.g. 101"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Course Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="React Mastery"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Teacher</label>
                            <input
                                type="text"
                                value={teacher}
                                onChange={(e) => setTeacher(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-white"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Price (₹)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="0 for Free"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="https://images.unsplash.com/..."
                                    required
                                />
                                <ImageIcon className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Overview</label>
                        <textarea
                            value={overview}
                            onChange={(e) => setOverview(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                            placeholder="Course description..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Create Course</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
