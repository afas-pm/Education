import React from "react";
import { useNavigate } from "react-router-dom";
import {
    GraduationCap,
    BookOpen,
    Target,
    Landmark,
    ScrollText,
    Code2,
    ChevronRight,
} from "lucide-react";

const programs = [
    {
        icon: GraduationCap,
        color: "bg-emerald-100 text-emerald-600",
        title: "School Tuition",
        desc: "Classes 1-12 covering CBSE, ICSE, and State syllabus.",
        bullets: ["Interactive Live Classes", "Exam Cracking Sessions", "Regular Assessments"],
    },
    {
        icon: BookOpen,
        color: "bg-blue-100 text-blue-600",
        title: "College Tuition",
        desc: "BSc, BCom, BA, and other degree program support.",
        bullets: ["Subject Experts", "Flexible Learning", "Practical Sessions"],
    },
    {
        icon: Target,
        color: "bg-orange-100 text-orange-600",
        title: "Entrance Coaching",
        desc: "NEET, JEE, CLAT, CUET preparation.",
        bullets: ["Mock Tests", "Previous Year Papers", "Doubt Clearing"],
    },
    {
        icon: Landmark,
        color: "bg-red-100 text-red-600",
        title: "Government Exams",
        desc: "SSC, Bank, PSC, Railway exam preparation.",
        bullets: ["Current Affairs", "Speed Training", "Interview Prep"],
    },
    {
        icon: ScrollText,
        color: "bg-purple-100 text-purple-600",
        title: "UPSC Coaching",
        desc: "Prelims, Mains, Interviews, Optional subjects.",
        bullets: ["Comprehensive Coverage", "Essay Writing", "Personality Tests"],
    },
    {
        icon: Code2,
        color: "bg-cyan-100 text-cyan-600",
        title: "Skill Development",
        desc: "Professional skills and certification courses.",
        bullets: ["Industry Relevant", "Hands-on Practice", "Career Guidance"],
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
                                <div className={`w-12 h-12 ${p.color} rounded-xl flex items-center justify-center mb-4`}>
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
                                    className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300 cursor-pointer"
                                >
                                    Explore Courses
                                    <ChevronRight className="w-4 h-4" />
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
