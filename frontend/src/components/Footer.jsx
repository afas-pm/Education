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

// No external imports needed for links as per screenshot

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-gray-300 font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">

          {/* Brand Column */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
              <h2 className="text-xl font-bold text-white">EduPlatform</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
              Empowering students with quality education through comprehensive online tuition and coaching programs.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-8">
            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["School Tuition", "College Tuition", "Entrance Coaching", "Government Exams", "UPSC Coaching"].map((link) => (
                <li key={link}>
                  <Link to="/courses" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="p-8">
            <h3 className="text-white text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              {["Help Center", "FAQ", "Contact Us", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="p-8">
            <h3 className="text-white text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">support@eduplatform.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Mumbai, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs tracking-wider">
            © 2024 EduPlatform. All rights reserved. | Designed for Excellence in Education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
