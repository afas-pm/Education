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
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">

                {/* ════════════════════════════════════════════
                    GRID LAYOUT
                    mobile  : 1 col  (each section full-width, stacked)
                    tablet  : 2 cols (brand+quicklinks | support+contact)
                    desktop : 4 cols (one per section)
                    Gap is tighter on mobile to avoid excessive spacing.
                ════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* ── Brand ── */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <GraduationCap className="w-7 h-7 text-blue-400 shrink-0" />
                            <h2 className="text-[18px] font-bold text-white">EduPlatform</h2>
                        </div>
                        <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
                            Empowering students with quality education through comprehensive online tuition and coaching programs.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors">
                                    <Icon className="w-[18px] h-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div>
                        <h3 className="text-[15px] font-bold text-white mb-5">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                "School Tuition",
                                "College Tuition",
                                "Entrance Coaching",
                                "Government Exams",
                                "UPSC Coaching",
                            ].map((link) => (
                                <li key={link}>
                                    <Link
                                        to="/courses"
                                        className="text-[14px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Support ── */}
                    <div>
                        <h3 className="text-[15px] font-bold text-white mb-5">Support</h3>
                        <ul className="space-y-3">
                            {[
                                "Help Center",
                                "FAQ",
                                "Contact Us",
                                "Privacy Policy",
                                "Terms of Service",
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-[14px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contact Info ── */}
                    <div>
                        <h3 className="text-[15px] font-bold text-white mb-5">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-[17px] h-[17px] text-blue-400 shrink-0" />
                                <span className="text-[14px] text-gray-400 break-all">
                                    support@eduplatform.com
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-[17px] h-[17px] text-blue-400 shrink-0" />
                                <span className="text-[14px] text-gray-400">
                                    +91 98765 43210
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-[17px] h-[17px] text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-[14px] text-gray-400 leading-relaxed">
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