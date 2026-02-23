import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import { Home, BookOpen, BookMarked, Users, Phone, X, Menu, LogOut, User as UserIcon, LayoutDashboard, ChevronDown, GraduationCap } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/courses', label: 'Courses', icon: BookOpen, hasChevron: true },
    { to: '/my-learning', label: 'My Learning', icon: BookOpen },
    { to: '/test-practice', label: 'Test Practice', icon: LayoutDashboard },
    { to: '/about', label: 'About Us', icon: BookMarked },
];

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

    // Close menus on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100'
                : 'bg-white border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <GraduationCap className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            EduPlatform
                        </span>
                    </NavLink>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
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

                    {/* Auth buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/10">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">{user.name.split(' ')[0]}</span>
                                </button>

                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[#1a1a44] border border-white/10 rounded-xl shadow-2xl py-2 animate-fadeIn">
                                        <div className="px-4 py-2 border-b border-white/5 mb-1">
                                            <p className="text-xs text-gray-400">Signed in as</p>
                                            <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                                        </div>
                                        {user.role === "admin" ? (
                                            <NavLink
                                                to="/admin/dashboard"
                                                onClick={() => setShowProfileMenu(false)}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-purple-400 hover:bg-white/5 hover:text-purple-300 transition-colors cursor-pointer"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Admin Panel
                                            </NavLink>
                                        ) : (
                                            <NavLink
                                                to="/dashboard"
                                                onClick={() => setShowProfileMenu(false)}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                My Dashboard
                                            </NavLink>
                                        )}
                                        <button
                                            onClick={() => { logout(); setShowProfileMenu(false); }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer border border-gray-200 rounded-lg mr-2"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-6 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-gray-300 hover:text-white p-2 cursor-pointer"
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
                    className="md:hidden bg-[#0f0f2e] border-t border-white/10 py-4 px-4 space-y-1 animate-fadeIn"
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
                                        ? 'bg-white/10 text-cyan-300'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        );
                    })}

                    {/* Mobile Auth */}
                    <div className="pt-3 border-t border-white/10 mt-3 space-y-2">
                        {user ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold ring-2 ring-white/10">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                                {user.role === "admin" ? (
                                    <NavLink
                                        to="/admin/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-purple-400 hover:bg-white/5 hover:text-purple-300 transition-all cursor-pointer"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        Admin Panel
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                                    >
                                        <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                                        My Dashboard
                                    </NavLink>
                                )}
                                <button
                                    onClick={() => { logout(); setMobileOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <NavLink
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center px-4 py-3 bg-white/5 text-white text-sm font-semibold rounded-lg border border-white/10 cursor-pointer"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg cursor-pointer"
                                >
                                    Sign Up
                                </NavLink>
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
