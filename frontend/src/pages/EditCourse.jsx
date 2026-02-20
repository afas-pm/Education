import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Image as ImageIcon, CheckCircle, Loader2, Save } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const EditCourse = () => {
    const { id } = useParams();
    const { token, backendUrl } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [customId, setCustomId] = useState("");
    const [name, setName] = useState("");
    const [teacher, setTeacher] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [overview, setOverview] = useState("");
    const [image, setImage] = useState("");
    const [isFree, setIsFree] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
                if (data.success) {
                    const c = data.course;
                    setCustomId(c.id);
                    setName(c.name);
                    setTeacher(c.teacher);
                    setCategory(c.category);
                    setPrice(c.price?.sale || 0);
                    setOriginalPrice(c.price?.original || 0);
                    setOverview(c.overview);
                    setImage(c.image);
                    setIsFree(c.isFree);
                }
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load course details");
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, backendUrl]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const { data } = await axios.put(
                `${backendUrl}/api/admin/course/${id}`,
                {
                    id: Number(customId),
                    name,
                    teacher,
                    category,
                    price: {
                        sale: Number(price),
                        original: Number(originalPrice)
                    },
                    isFree: isFree || Number(price) === 0,
                    overview,
                    image,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success(data.message);
            setUpdating(false);
            navigate("/admin/courses");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update course");
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
                <p className="text-slate-400">Loading course details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <button
                onClick={() => navigate("/admin/courses")}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Courses
            </button>

            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Edit Course Details
            </h1>

            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Course ID (Numeric)</label>
                            <input
                                type="number"
                                value={customId}
                                onChange={(e) => setCustomId(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
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
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Teacher</label>
                            <input
                                type="text"
                                value={teacher}
                                onChange={(e) => setTeacher(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-purple-500 transition-colors"
                                    required
                                />
                                <ImageIcon className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Sale Price (₹)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Original Price (₹)</label>
                            <input
                                type="number"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={isFree}
                                    onChange={(e) => setIsFree(e.target.checked)}
                                    className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                                />
                                <span className="text-slate-300 group-hover:text-white transition-colors">Mark as Free</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Overview</label>
                        <textarea
                            value={overview}
                            onChange={(e) => setOverview(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex justify-center items-center gap-2"
                    >
                        {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCourse;
