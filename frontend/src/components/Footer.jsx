import React from "react";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#020617] text-gray-300 font-sans border-t border-white/5">
            {/* ✅ max-w-[1440px] + px-6 lg:px-10 matches every other page exactly */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* ── Brand Column ── */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <GraduationCap className="w-8 h-8 text-blue-400" />
                            <h2 className="text-[20px] font-bold text-white">EduPlatform</h2>
                        </div>
                        <p className="text-[15px] text-gray-400 leading-relaxed mb-7 pr-4">
                            Empowering students with quality education through comprehensive online tuition and coaching programs.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Icon className="w-[18px] h-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div>
                        <h3 className="text-[16px] font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3.5">
                            {["School Tuition", "College Tuition", "Entrance Coaching", "Government Exams", "UPSC Coaching"].map((link) => (
                                <li key={link}>
                                    <Link
                                        to="/courses"
                                        className="text-[15px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Support ── */}
                    <div>
                        <h3 className="text-[16px] font-bold text-white mb-6">Support</h3>
                        <ul className="space-y-3.5">
                            {["Help Center", "FAQ", "Contact Us", "Privacy Policy", "Terms of Service"].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-[15px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contact Info ── */}
                    <div>
                        <h3 className="text-[16px] font-bold text-white mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-[18px] h-[18px] text-blue-400 shrink-0" />
                                <span className="text-[15px] text-gray-400">support@eduplatform.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-[18px] h-[18px] text-blue-400 shrink-0" />
                                <span className="text-[15px] text-gray-400">+91 98765 43210</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-[18px] h-[18px] text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-[15px] text-gray-400 leading-relaxed">
                                    Mumbai, Maharashtra, India
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── Bottom bar ── */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-[13px] text-gray-500 tracking-wide">
                        © 2024 EduPlatform. All rights reserved. | Designed for Excellence in Education
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;