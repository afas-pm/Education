import React from "react";
import { Link } from "react-router-dom";
import {
  socialIcons,
  quickLinks,
  supportLinks,
  contactInfo,
} from "../assets/dummyFooter";
import {
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const socialIconMap = { Twitter, Instagram, Linkedin };

const Footer = () => {
  return (
    <footer className="bg-[#0f0f2e] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">SkillForge</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Empowering students with quality
              education to excel in academics and
              competitive examinations.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map((s) => {
                const Icon = socialIconMap[s.iconKey] || Twitter;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4 text-gray-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { name: "School Tuition", href: "/courses" },
                { name: "College Tuition", href: "/courses" },
                { name: "Entrance Coaching", href: "/courses" },
                { name: "Government Exams", href: "/courses" },
                { name: "UPSC Coaching", href: "/courses" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-300 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm break-all">{contactInfo.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{contactInfo.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {contactInfo.addressLine1}, {contactInfo.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2024 SkillForge. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Designed by{" "}
            <a
              href={contactInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {contactInfo.designBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
