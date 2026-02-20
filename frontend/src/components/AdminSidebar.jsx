import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen text-white flex flex-col fixed left-0 top-0 bottom-0 z-50">
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="p-2 bg-purple-600 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Admin Panel
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link
                    to="/admin/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin/dashboard")
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                </Link>

                <Link
                    to="/admin/users"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin/users")
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Users</span>
                </Link>

                <Link
                    to="/admin/courses"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/admin/courses")
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">Courses</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
