import React from "react";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    BookOpen,
    Target,
    Medal,
    Crown,
    Users,
    ChevronRight,
} from "lucide-react";

const programs = [
    {
        icon: BookOpen,
        color: "bg-[#4da1ff] text-white",
        title: "School Tuition",
        desc: "Classes 4-12 covering CBSE, ICSE, and State syllabus",
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
        icon: Medal,
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
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Comprehensive Learning Programs
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                        Choose from our wide range of courses designed to help you achieve your
                        academic and career goals
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {programs.map((p) => {
                        const Icon = p.icon;
                        return (
                            <div
                                key={p.title}
                                className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 ${p.color} rounded-xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{p.desc}</p>

                                {/* Bullets */}
                                <ul className="space-y-2 mb-5">
                                    {p.bullets.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>

                                {/* Link */}
                                <button
                                    onClick={() => navigate("/courses")}
                                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg border border-gray-100 transition-all duration-300 cursor-pointer"
                                >
                                    Explore Courses
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LearningPrograms;
