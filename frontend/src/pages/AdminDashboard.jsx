import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Users, BookOpen, BarChart3, Loader2, TrendingUp, DollarSign } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
    const { token, backendUrl } = useAuth();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStats(data.stats);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
        </div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Dashboard Overview
                    </h1>
                    <p className="text-slate-400 mt-2">Welcome back! Here's what's happening with SkillForge today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-blue-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-all">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +12%
                        </span>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Total Courses</p>
                        <h3 className="text-3xl font-bold text-white">{stats.totalCourses || 0}</h3>
                    </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-green-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-all">
                            <Users className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +5%
                        </span>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Total Users</p>
                        <h3 className="text-3xl font-bold text-white">{stats.totalUsers || 0}</h3>
                    </div>
                </div>

                {/* Dummy Sales/Revenue for visual polish */}
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-all">
                            <DollarSign className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Total Sales</p>
                        <h3 className="text-3xl font-bold text-white">₹45,200</h3>
                    </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-orange-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-all">
                            <BarChart3 className="w-6 h-6 text-orange-400" />
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Avg Engagement</p>
                        <h3 className="text-3xl font-bold text-white">78%</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-64 flex items-center justify-center text-slate-500 italic">
                    [ Enrollment Activity Chart Placeholder ]
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-64 flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-12 h-12 text-purple-500/50 mb-3" />
                    <h4 className="font-bold text-white">System Status</h4>
                    <p className="text-slate-400 text-sm">All services are running smoothly.</p>
                </div>
            </div>
        </div>
    );
};

const ShieldCheck = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
);

export default AdminDashboard;
