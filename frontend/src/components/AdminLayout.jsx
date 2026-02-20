import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Use Outlet for nested routes
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        // If finished loading and no user or not admin, redirect
        if (!loading) {
            if (!user || user.role !== "admin") {
                navigate("/");
            }
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Admin Panel...</div>;

    return (
        <div className="flex min-h-screen bg-slate-950 text-white font-sans">
            <AdminSidebar />
            <div className={`flex-1 flex flex-col transition-all duration-300 ml-64`}>
                {/* Top Header if needed, for now just content area with padding */}
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
