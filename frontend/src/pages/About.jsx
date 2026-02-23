import React, { useState, useEffect, useRef } from "react";
import {
    counterTargets,
    statsMeta,
    missionVisionValues,
    teamMembers,
    values,
    milestones,
    testimonials,
} from "../assets/dummyAbout";
import AboutBannerImage from "../assets/AboutBannerImage.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Star,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Target,
    Eye,
    Heart,
    Calendar,
} from "lucide-react";

/* ─── Animated Counter Hook ─── */
const useCounter = (target, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const step = target / (duration / 16);
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, 16);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return { count, ref };
};

/* ─── Section icon mapping ─── */
const sectionIcons = { mission: Target, vision: Eye, values: Heart };
const sectionColors = {
    mission: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-500 to-cyan-500" },
    vision: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", gradient: "from-purple-500 to-pink-500" },
    values: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200", gradient: "from-green-500 to-emerald-500" },
};

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ─── Hero ─── */}
            <section
                className="relative pt-16 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a1a4e 0%, #2d1b69 40%, #4c1d95 70%, #1e3a5f 100%)" }}
            >
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Text */}
                        <div className="text-white space-y-5">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                                <span className="text-white/90">Trusted by 50,000+ Students</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                                About{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                                    EduPlatform
                                </span>
                            </h1>
                            <p className="text-blue-100/80 text-base sm:text-lg max-w-md leading-relaxed">
                                Empowering learners worldwide with cutting-edge courses and expert
                                instruction. Your journey to mastery starts here.
                            </p>

                            {/* Mini stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {statsMeta.slice(0, 4).map((stat) => {
                                    const { count, ref } = useCounter(counterTargets[stat.key], 2000);
                                    return (
                                        <div key={stat.key} ref={ref} className="text-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3">
                                            <div className="text-xl sm:text-2xl font-bold text-white">
                                                {count.toLocaleString()}{stat.key === "successRate" ? "%" : "+"}
                                            </div>
                                            <div className="text-blue-200/60 text-xs mt-0.5">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex justify-center md:justify-end">
                            <img
                                src={AboutBannerImage}
                                alt="About EduPlatform"
                                className="w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl shadow-purple-500/20 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Mission / Vision / Values — Compact Cards ─── */}
            <section className="py-14 md:py-18 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">What Drives Us</h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                            Our mission, vision, and values shape everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {missionVisionValues.map((section) => {
                            const Icon = sectionIcons[section.type] || Target;
                            const colors = sectionColors[section.type] || sectionColors.mission;
                            return (
                                <div key={section.type} className={`bg-white rounded-xl p-6 border ${colors.border} hover:shadow-lg transition-all duration-300`}>
                                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className={`w-6 h-6 ${colors.text}`} />
                                    </div>
                                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500 mb-3">
                                        {section.subtitle}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{section.description}</p>
                                    <ul className="space-y-2">
                                        {section.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Core Values ─── */}
            <section className="py-14 md:py-18 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">What We Stand For</h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                            The principles that guide our commitment to excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((value) => (
                            <div key={value.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
                                <h3 className="text-base font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">{value.description}</p>
                                <ul className="space-y-1.5">
                                    {value.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className={`w-1.5 h-1.5 bg-gradient-to-r ${value.color} rounded-full flex-shrink-0`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Team ─── */}
            <section className="py-14 md:py-18 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                            Passionate educators and innovators driving our mission
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="text-center group">
                                <div className="mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover shadow-md ring-4 ring-white group-hover:shadow-lg transition-shadow duration-300"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">{member.name}</h3>
                                <p className="text-blue-600 text-xs sm:text-sm font-medium mb-1">{member.role}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Milestones ─── */}
            <section className="py-14 md:py-18 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Journey</h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                            Key milestones that shaped who we are today
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {milestones.map((m) => (
                            <div key={m.year} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <span className="text-blue-600 font-bold text-sm">{m.year}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 mb-1">{m.event}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">{m.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Testimonials ─── */}
            <section className="py-14 md:py-18 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">What Students Say</h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                            Hear from learners who transformed their careers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.name} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-0.5 mb-3">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" loading="lazy" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section
                className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a1a4e 0%, #2d1b69 40%, #4c1d95 70%, #1e3a5f 100%)" }}
            >
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
                <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-blue-100/70 mb-8 text-sm sm:text-base max-w-lg mx-auto">
                        Join thousands of students already mastering new skills with our expert-led courses.
                    </p>
                    <a
                        href="/courses"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        Browse Courses
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
