import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Zap, Target, History, FileText, CheckCircle, Brain, ChevronRight } from "lucide-react";
import NavbarDesign from "../components/NavbarDesign";
import Footer from "../components/Footer";

const TestPracticeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mapping title based on ID for demo purposes
    const title = id === "plus-two-bio" ? "Plus Two Bio science - Complete Course" : "Test Practice Selection";

    const practiceTypes = [
        {
            title: "Daily Practice",
            desc: "Quick daily questions to keep you sharp",
            icon: CheckCircle,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            btn: "Start Daily Practice",
            features: ["Full syllabus coverage", "3 hour duration", "All subjects included"],
            footerText: "Quick 10-15 questions daily"
        },
        {
            title: "Full Syllabus Mock Test",
            desc: "Complete mock test covering all topics",
            icon: Brain,
            color: "text-blue-500",
            bg: "bg-blue-50",
            btn: "Start Mock Test",
            features: ["Full syllabus coverage", "3 hour duration", "All subjects included"]
        }
    ];

    const subjects = [
        "Mathematics", "Botany",
        "Physics", "Zoology",
        "Chemistry", "English"
    ];

    const [navHeight, setNavHeight] = useState(70);

    useEffect(() => {
        const el = document.querySelector("nav") || document.querySelector("header");
        if (el) setNavHeight(el.offsetHeight);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <NavbarDesign />

            {/* ✅ Spacer to push content below fixed navbar */}
            <div style={{ height: navHeight }} className="shrink-0" />

            <main className="flex-grow py-8 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-[32px] font-bold text-[#1E293B] mb-1">Test Practice</h1>
                            <p className="text-[#64748B] text-lg mb-8">Practice with mock tests and improve your preparation</p>

                            <h2 className="text-[22px] font-bold text-[#475569] mb-1">{title}</h2>
                            <p className="text-[#64748B] text-[17px]">Choose your practice type</p>
                        </div>
                        <button
                            onClick={() => navigate("/test-practice")}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Courses
                        </button>
                    </div>

                    {/* Practice Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {practiceTypes.map((type) => (
                            <div key={type.title} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                        <type.icon className={`w-8 h-8 ${type.color}`} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-[22px] font-bold text-[#1E293B]">{type.title}</h3>
                                        <p className="text-[#64748B] text-sm mt-0.5">{type.desc}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {type.features.map(f => (
                                        <li key={f} className="flex items-center gap-3 text-[15px] text-[#475569] font-medium">
                                            <div className="w-[6px] h-[6px] rounded-full bg-[#1E293B] flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {type.footerText && (
                                    <p className="text-sm text-[#64748B] mb-4">{type.footerText}</p>
                                ) || <div className="mb-4" />}

                                <button
                                    onClick={() => navigate(`/test-interface/${id}`)}
                                    className="w-full py-3.5 bg-[#017CBA] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
                                >
                                    {type.btn}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Lower Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Previous Year Papers */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex-shrink-0 text-orange-500">
                                    <History className="w-10 h-10" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bold text-[#1E293B]">Previous Year Papers</h3>
                                    <p className="text-[#64748B] text-sm mt-0.5">Solve previous year question papers</p>
                                </div>
                            </div>
                            <div className="space-y-4 mt-6">
                                <p className="text-[13px] font-semibold text-[#94A3B8] tracking-wide">
                                    Select Subject:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {subjects.map(s => (
                                        <button key={s} className="px-5 py-4 bg-white border border-gray-100 rounded-xl text-left text-[15px] font-semibold text-[#1E293B] hover:border-[#017CBA] hover:text-[#017CBA] transition-all truncate shadow-sm">
                                            {s} Previous Papers
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Model Exam */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex-shrink-0 text-blue-500">
                                    <FileText className="w-10 h-10" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-bold text-[#1E293B]">Model Exam</h3>
                                    <p className="text-[#64748B] text-sm mt-0.5">Subject-wise model examinations</p>
                                </div>
                            </div>
                            <div className="space-y-4 mt-6">
                                <p className="text-[13px] font-semibold text-[#94A3B8] tracking-wide">
                                    Select Subject:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {subjects.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => navigate(`/test-interface/${id}`)}
                                            className="px-5 py-4 bg-white border border-gray-100 rounded-xl text-left text-[15px] font-semibold text-[#1E293B] hover:border-[#017CBA] hover:text-[#017CBA] transition-all truncate shadow-sm"
                                        >
                                            {s} Model Exam
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TestPracticeDetails;
