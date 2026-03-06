import React from "react";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    BookOpen,
    Target,
    Award,
    Crown,
    Users,
} from "lucide-react";

const programs = [
    {
        icon: BookOpen,
        color: "bg-[#4da1ff] text-white",
        title: "School Tuition",
        desc: "Classes 4-12 covering CBSE, ICSE, and State syllabi",
        bullets: ["Interactive Live Classes", "Doubt Clearing Sessions", "Regular Assessments"],
    },
    {
        icon: GraduationCap,
        color: "bg-[#a855f7] text-white",
        title: "College Tuition",
        desc: "BSc, BCom, BA, BTech and other degree programs",
        bullets: ["Subject Experts", "Practical Learning", "Project Guidance"],
    },
    {
        icon: Target,
        color: "bg-[#22c55e] text-white",
        title: "Entrance Coaching",
        desc: "NEET, JEE, KEAM, CUET preparation",
        bullets: ["Mock Tests", "Previous Year Papers", "Rank Prediction"],
    },
    {
        icon: Award,
        color: "bg-[#f97316] text-white",
        title: "Government Exams",
        desc: "SSC, Bank, PSC, Railway exam preparation",
        bullets: ["Current Affairs", "Speed Training", "Interview Prep"],
    },
    {
        icon: Crown,
        color: "bg-[#ef4444] text-white",
        title: "UPSC Coaching",
        desc: "Prelims, Mains, Interview, Optional subjects",
        bullets: ["Comprehensive Coverage", "Essay Writing", "Personality Dev"],
    },
    {
        icon: Users,
        color: "bg-[#06b6d4] text-white",
        title: "Skill Development",
        desc: "Professional skills and certification courses",
        bullets: ["Industry Relevant", "Hands-on Practice", "Certificate"],
    },
];

const LearningPrograms = () => {
    const navigate = useNavigate();

    return (
        <section className="pt-20 pb-48 md:pt-24 md:pb-56 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#1e293b] mb-4 leading-tight">
                        Comprehensive Learning Programs
                    </h2>
                    <p className="text-[#64748b] max-w-2xl mx-auto text-base sm:text-lg">
                        Choose from our wide range of courses designed to help you achieve your
                        academic and career goals
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {programs.map((p) => {
                        const Icon = p.icon;
                        return (
                            <div
                                key={p.title}
                                className="group bg-white border border-gray-100 rounded-[24px] p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Icon Container (Soft rounded square) */}
                                <div className={`w-14 h-14 ${p.color} rounded-[16px] flex items-center justify-center mb-6 shadow-lg shadow-current/10`}>
                                    <Icon className="w-7 h-7" />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-[#1e293b] mb-3">{p.title}</h3>
                                    <p className="text-[#64748b] text-sm mb-6 leading-relaxed">{p.desc}</p>

                                    {/* Bullets */}
                                    <ul className="space-y-3 mb-8">
                                        {p.bullets.map((b) => (
                                            <li key={b} className="flex items-center gap-3 text-[14px] text-[#475569] font-medium font-sans">
                                                <div className="w-[6px] h-[6px] bg-[#017CBA] rounded-full flex-shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Explore Courses Button — Matching Figma Design */}
                                <div className="mt-auto">
                                    <button
                                        onClick={() => navigate("/courses")}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-100 hover:border-blue-100 text-[#1e293b] font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:bg-gray-50 font-sans"
                                    >
                                        Explore Courses
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LearningPrograms;