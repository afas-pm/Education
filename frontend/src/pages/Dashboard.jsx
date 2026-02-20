import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    BookOpen,
    Clock,
    Trophy,
    ArrowRight,
    Loader2,
    PlayCircle,
    CheckCircle2,
    LayoutDashboard
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, token, backendUrl } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [completedChapters, setCompletedChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        // Redirect Admin to Admin Dashboard
        if (user && user.role === "admin") {
            navigate("/admin/dashboard");
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/user/my-courses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setEnrolledCourses(data.courses);
                    setCompletedChapters(data.completedChapters);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token, backendUrl, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                <p className="text-gray-400">Loading your learning journey...</p>
            </div>
        );
    }

    const totalChapters = enrolledCourses.reduce((sum, course) => {
        return sum + course.lectures.reduce((lSum, lec) => lSum + (lec.chapters?.length || 0), 0);
    }, 0);

    const completionRate = totalChapters > 0 ? Math.round((completedChapters.length / totalChapters) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
                {/* Welcome Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Welcome back, <span className="text-white font-semibold">{user?.name}</span>! Ready to continue your learning?
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BookOpen className="w-16 h-16" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Enrolled Courses</p>
                        <h3 className="text-4xl font-bold">{enrolledCourses.length}</h3>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle2 className="w-16 h-16" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Chapters Completed</p>
                        <h3 className="text-4xl font-bold">{completedChapters.length}</h3>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-50 blur-lg"></div>
                        <div className="relative">
                            <div className="absolute top-0 right-0 opacity-20 group-hover:opacity-30 transition-opacity">
                                <Trophy className="w-16 h-16 text-indigo-400" />
                            </div>
                            <p className="text-gray-400 text-sm font-medium mb-1">Overall Progress</p>
                            <h3 className="text-4xl font-bold text-indigo-400">{completionRate}%</h3>
                        </div>
                    </div>
                </div>

                {/* Enrolled Courses List */}
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    My Learning
                    <div className="h-px flex-1 bg-white/10 ml-4"></div>
                </h2>

                {enrolledCourses.length === 0 ? (
                    <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-12 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No courses enrolled yet</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Explore our catalog and start your learning journey today with our expert-led courses.
                        </p>
                        <button
                            onClick={() => navigate("/courses")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2 group"
                        >
                            Explore Courses
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {enrolledCourses.map((course) => {
                            const courseTotalChapters = course.lectures.reduce((sum, lec) => sum + (lec.chapters?.length || 0), 0);
                            const courseCompletedChapters = course.lectures.reduce((sum, lec) => {
                                return sum + (lec.chapters?.filter(ch => completedChapters.includes(ch.id)).length || 0);
                            }, 0);
                            const courseProgress = courseTotalChapters > 0 ? Math.round((courseCompletedChapters / courseTotalChapters) * 100) : 0;

                            return (
                                <div
                                    key={course._id}
                                    className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all group flex flex-col md:flex-row h-full"
                                >
                                    {/* Thumbnail */}
                                    <div className="md:w-48 h-48 md:h-auto relative overflow-hidden shrink-0">
                                        <img
                                            src={course.image}
                                            alt={course.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 block">
                                                {course.category}
                                            </span>
                                            <h4 className="text-xl font-bold line-clamp-1 group-hover:text-indigo-400 transition-colors">
                                                {course.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                By {course.teacher}
                                            </p>
                                        </div>

                                        {/* Progress */}
                                        <div className="mt-auto">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-400">
                                                        {courseCompletedChapters}/{courseTotalChapters} Chapters
                                                    </span>
                                                </div>
                                                <span className="text-sm font-bold text-indigo-400">{courseProgress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                                                <div
                                                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000"
                                                    style={{ width: `${courseProgress}%` }}
                                                ></div>
                                            </div>

                                            <button
                                                onClick={() => navigate(`/courses/${course.id}`)}
                                                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                <PlayCircle className="w-5 h-5 text-indigo-400" />
                                                Continue Learning
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
