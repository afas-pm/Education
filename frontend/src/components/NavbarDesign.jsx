import React, { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, BookMarked, X, Menu, LogOut, LayoutDashboard, ChevronDown, GraduationCap } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/courses', label: 'Courses', icon: BookOpen, hasChevron: true },
    { to: '/my-learning', label: 'My Learning', icon: BookOpen },
    { to: '/test-practice', label: 'Test Practice', icon: LayoutDashboard },
    { to: '/about', label: 'About Us', icon: BookMarked },
];

// Avatar component from second code
const Avatar = () => {
    return (
        <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
            alt="User Profile"
            className="w-11 h-11 rounded-full object-cover shadow-sm ring-1 ring-gray-100"
        />
    );
};

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { user, logout } = useAuth();
    const menuRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMobileOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-200' : 'bg-white border-gray-100'
            }`}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">

                    {/* Logo — flex-1 so it takes equal width */}
                    <div className="flex-1">
                        <NavLink to="/" className="flex items-center gap-2 group w-fit">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">EduPlatform</span>
                        </NavLink>
                    </div>

                    {/* Desktop Nav — centered, no flex-1 so it stays in the middle */}
                    <div className="hidden md:flex items-center gap-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${isActive
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                    }`
                                }
                            >
                                {item.label}
                                {item.hasChevron && <ChevronDown className="w-4 h-4" />}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Right — min-w matches Login+SignUp width in Navbar.jsx */}
                    <div className="flex-1 hidden md:flex items-center justify-end gap-3 min-w-[180px]">
                        <div className="relative" ref={profileRef}>
                            {/* Avatar button */}
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="cursor-pointer focus:outline-none block"
                            >
                                <Avatar />
                            </button>

                            {/* Dropdown - Only shown when user is logged in */}
                            {showProfileMenu && user && (
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl py-2 animate-fadeIn">
                                    <div className="px-4 py-3 border-b border-gray-100 mb-1 flex items-center gap-3">
                                        <Avatar />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {user.role === 'admin' ? (
                                        <NavLink
                                            to="/admin/dashboard"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Admin Panel
                                        </NavLink>
                                    ) : (
                                        <NavLink
                                            to="/dashboard"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            My Dashboard
                                        </NavLink>
                                    )}

                                    <button
                                        onClick={() => { logout(); setShowProfileMenu(false); }}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}

                            {/* Simple dropdown for non-logged in users */}
                            {showProfileMenu && !user && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 animate-fadeIn">
                                    <NavLink
                                        to="/login"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="w-full flex items-center justify-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="w-full flex items-center justify-center px-4 py-2.5 text-sm bg-[#017CBA] text-white rounded-lg mx-2 my-1 hover:bg-blue-700 transition-all cursor-pointer"
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-gray-500 hover:text-gray-900 p-2 cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    ref={menuRef}
                    className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-1 shadow-lg animate-fadeIn"
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        );
                    })}

                    {/* Mobile Auth */}
                    <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
                        {user ? (
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <div className="shadow-sm ring-1 ring-gray-100 rounded-full">
                                        <Avatar />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>

                                {user.role === 'admin' ? (
                                    <NavLink
                                        to="/admin/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-purple-600 hover:bg-purple-50 transition-all cursor-pointer rounded-lg"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        Admin Panel
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer rounded-lg"
                                    >
                                        <LayoutDashboard className="w-5 h-5 text-blue-500" />
                                        My Dashboard
                                    </NavLink>
                                )}

                                <button
                                    onClick={() => { logout(); setMobileOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-500 text-sm font-semibold rounded-lg cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <div className="shadow-sm ring-1 ring-gray-100 rounded-full">
                                        <Avatar />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Guest User</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <NavLink
                                        to="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center px-4 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg cursor-pointer hover:border-blue-300 hover:text-blue-600 transition-all"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center px-4 py-3 bg-[#017CBA] text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
            `}</style>
        </nav>
    );
};

export default Navbar;