import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Zap, Target, History, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
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
            icon: Zap,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            btn: "Start Daily Practice",
            features: ["Full syllabus coverage", "3 hour duration", "All subjects included"]
        },
        {
            title: "Full Syllabus Mock Test",
            desc: "Complete mock test covering all topics",
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-50",
            btn: "Start Mock Test",
            features: ["Full syllabus coverage", "3 hour duration", "All subjects included"]
        }
    ];

    const subjects = [
        "Mathematics Model Exam", "Botany Model Exam",
        "Physics Model Exam", "Zoology Model Exam",
        "Chemistry Model Exam", "English Model Exam"
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                            <p className="text-gray-500">Choose your practice type</p>
                        </div>
                        <button
                            onClick={() => navigate("/test-practice")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all self-start"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Courses
                        </button>
                    </div>

                    {/* Practice Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {practiceTypes.map((type) => (
                            <div key={type.title} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`${type.bg} ${type.color} p-4 rounded-xl`}>
                                        <type.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{type.desc}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {type.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => navigate(`/test-interface/${id}`)}
                                    className="w-full py-4 bg-[#017CBA] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
                                >
                                    {type.btn}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Previous Papers & Model Exam */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Previous Year Papers */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                                    <History className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Previous Year Papers</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {subjects.map(s => (
                                    <button key={s} className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-left text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all truncate">
                                        {s.replace("Model Exam", "Previous Papers")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Model Exam */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Model Exam</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {subjects.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => navigate(`/test-interface/${id}`)}
                                        className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-left text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all truncate"
                                    >
                                        {s}
                                    </button>
                                ))}
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
