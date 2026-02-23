import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    User,
    Mail,
    MessageSquare,
    Send,
    Sparkles,
    Tag,
    Phone,
    MapPin,
    Clock,
    Globe,
    CheckCircle2,
    ChevronDown
} from "lucide-react";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            errs.email = "Invalid email address";
        if (!form.subject) errs.subject = "Please select a subject";
        if (!form.message.trim()) errs.message = "Message is required";
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setSubmitting(true);
        // Simulate submission
        await new Promise((r) => setTimeout(r, 1500));
        setSubmitting(false);
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        { icon: Phone, label: "Call Us", value: "+91 98765 43210", color: "text-cyan-400" },
        { icon: Mail, label: "Email Us", value: "support@eduplatform.com", color: "text-purple-400" },
        { icon: MapPin, label: "Visit Us", value: "EduPlatform Tower, Tech Hub, Bangalore", color: "text-pink-400" },
        { icon: Clock, label: "Hours", value: "Mon - Sat: 9:00 AM - 7:00 PM", color: "text-blue-400" },
    ];

    return (
        <div className="min-h-screen bg-[#0f0f2e]">
            <Navbar />

            <div
                className={`relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: "linear-gradient(135deg, #161642 0%, #0f0f2e 100%)" }}
            >
                {/* Background Decor */}
                <div className="absolute top-20 left-0 w-96 h-96 bg-magenta-500/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6 animate-bounce">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-100/80">We're here to help</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Touch</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Info Section */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                                {contactInfo.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/8 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                                <item.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                                                <p className="text-white font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Card */}
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-md relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyan-400/20 transition-all duration-500" />
                                <h4 className="text-xl font-bold text-white mb-4">Why EduPlatform?</h4>
                                <ul className="space-y-3">
                                    {["24/7 Expert Support", "Dedicated Mentorship", "Lifetime Course Access"].map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <CheckCircle2 size={16} className="text-cyan-400" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="lg:col-span-7">
                            <div className="relative">
                                {/* Form Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />

                                <div className="p-8 md:p-10 rounded-3xl bg-[#161642]/60 border border-white/10 backdrop-blur-2xl shadow-2xl">
                                    {submitted ? (
                                        <div className="py-12 text-center animate-fadeIn">
                                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle2 size={48} className="text-green-400" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                                            <p className="text-gray-400 max-w-sm mx-auto">
                                                Thank you for reaching out. Our team will get back to you within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
                                            >
                                                Send Another Message
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Name */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-400 ml-1">Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={form.name}
                                                            onChange={handleChange}
                                                            placeholder="John Doe"
                                                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-purple-500/30'
                                                                }`}
                                                        />
                                                    </div>
                                                    {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                                                </div>

                                                {/* Email */}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-400 ml-1">Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={form.email}
                                                            onChange={handleChange}
                                                            placeholder="john@example.com"
                                                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-blue-500/30'
                                                                }`}
                                                        />
                                                    </div>
                                                    {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                                                </div>
                                            </div>

                                            {/* Subject */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-400 ml-1">Subject</label>
                                                <div className="relative">
                                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <select
                                                        name="subject"
                                                        value={form.subject}
                                                        onChange={handleChange}
                                                        className={`w-full pl-12 pr-10 py-4 bg-[#1e1e4a] border rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 transition-all ${errors.subject ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-green-500/30'
                                                            }`}
                                                    >
                                                        <option value="">Select a subject</option>
                                                        <option value="general">General Inquiry</option>
                                                        <option value="support">Technical Support</option>
                                                        <option value="billing">Billing Question</option>
                                                        <option value="partnership">Partnership</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                                </div>
                                                {errors.subject && <p className="text-xs text-red-500 ml-1">{errors.subject}</p>}
                                            </div>

                                            {/* Message */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-400 ml-1">Message</label>
                                                <div className="relative">
                                                    <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-gray-500" />
                                                    <textarea
                                                        name="message"
                                                        value={form.message}
                                                        onChange={handleChange}
                                                        rows={5}
                                                        placeholder="How can we help you?"
                                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-purple-500/30'
                                                            }`}
                                                    ></textarea>
                                                </div>
                                                {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg flex items-center justify-center gap-3 overflow-hidden group relative ${submitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600'
                                                    }`}
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[30deg]" />
                                                {submitting ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Processing...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        <span>Send Message</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Contact;
