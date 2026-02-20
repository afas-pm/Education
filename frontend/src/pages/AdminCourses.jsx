import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Trash2, Edit, Plus, BookOpen, Search } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AdminCourses = () => {
    const { token, backendUrl } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/course/list`);
            setCourses(data.courses);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []); // eslint-disable-line

    const deleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const { data } = await axios.delete(`${backendUrl}/api/admin/course/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success(data.message);
                fetchCourses();
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete course");
            }
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Course Management
                </h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500 w-64"
                        />
                    </div>
                    <Link
                        to="/admin/add-course"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20"
                    >
                        <Plus className="w-5 h-5" />
                        Add Course
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center py-12 text-slate-500">Loading courses...</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="col-span-3 text-center py-12">
                        <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500">No courses found.</p>
                    </div>
                ) : (
                    filteredCourses.map((course) => (
                        <div key={course._id} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-600 transition-all">
                            <div className="h-40 overflow-hidden relative">
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white border border-white/10">
                                    {course.category}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{course.name}</h3>
                                <p className="text-sm text-slate-400 mb-4">By {course.teacher}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                    <div className="text-blue-400 font-bold">
                                        {course.isFree ? "Free" : `₹${course.price?.sale || 0}`}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link to={`/admin/course/${course._id}`} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Edit Course Details">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <Link to={`/admin/course/${course._id}/add-lecture`} className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-colors" title="Manage Lectures & Content">
                                            <Plus className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => deleteCourse(course._id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminCourses;
