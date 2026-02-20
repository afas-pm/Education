import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const AddLecture = () => {
    const { id } = useParams(); // Course ID
    const { token, backendUrl } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [lectureId, setLectureId] = useState("");
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/course/${id}`,
                {
                    id: lectureId,
                    title,
                    durationMin: Number(duration),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success(data.message);
            setLoading(false);
            navigate("/admin/courses");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add lecture");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl">
            <button
                onClick={() => navigate("/admin/courses")}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Courses
            </button>

            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Add New Lecture
            </h1>

            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-400">Lecture ID</label>
                            <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-tighter">System ID</span>
                        </div>
                        <input
                            type="text"
                            value={lectureId}
                            onChange={(e) => setLectureId(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="e.g. intro-react (Used for URL slug)"
                            required
                        />
                        <p className="text-[11px] text-slate-500 mt-2 px-1">
                            A unique internal name (like "react-basics") used to organize chapters.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Lecture Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Introduction to React"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Duration (Minutes)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="15"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/25 transition-all flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Add Lecture</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLecture;
