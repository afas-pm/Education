import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        const res = await register(formData.name, formData.email, formData.password);
        setIsSubmitting(false);
        if (res.success) {
            toast.success('Registration successful! Please login.');
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f0f2e 0%, #1a1044 25%, #2d1b69 50%, #1e3a5f 80%, #0f2a4a 100%)" }}>

            {/* Decorative Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl mb-4 border border-white/20">
                        <User className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Join SkillForge</h2>
                    <p className="text-blue-100/60 text-sm">Start your learning journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/40 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/40 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/40 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/40 hover:text-white transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blue-100/80 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300/40 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full bg-white/5 border rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:ring-cyan-500/50'
                                    }`}
                            />
                        </div>
                        {error && <p className="text-red-400 text-xs ml-1">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Create Account
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-blue-100/40 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Logo Link */}
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="font-bold tracking-tight">SkillForge</span>
            </Link>
        </div>
    );
};

export default Register;
