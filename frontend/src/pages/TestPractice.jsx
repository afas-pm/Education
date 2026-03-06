import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { testStats, availableTests } from "../assets/dummyTestPractice";
import { BookOpen, CheckCircle, BarChart3, Clock, Star } from "lucide-react";
import NavbarDesign from "../components/NavbarDesign";
import Footer from "../components/Footer";

const TestPractice = () => {
    const navigate = useNavigate();

    const [navHeight, setNavHeight] = useState(70);

    useEffect(() => {
        const el = document.querySelector("nav") || document.querySelector("header");
        if (el) setNavHeight(el.offsetHeight);
    }, []);

    const getIcon = (iconName, color) => {
        const iconClass = "w-7 h-7";
        switch (iconName) {
            case "book-open": return <BookOpen className={`${iconClass} text-[#017CBA]`} strokeWidth={2} />;
            case "check": return <CheckCircle className={`${iconClass} text-[#10B981]`} strokeWidth={2} />;
            case "bar-chart": return <BarChart3 className={`${iconClass} text-[#3B82F6]`} strokeWidth={2} />;
            case "clock": return <Clock className={`${iconClass} text-[#F97316]`} strokeWidth={2} />;
            default: return <BookOpen className={`${iconClass} text-[#017CBA]`} strokeWidth={2} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <NavbarDesign />

            {/* ✅ Spacer to push content below fixed navbar */}
            <div style={{ height: navHeight }} className="shrink-0" />

            <main className="flex-grow py-8 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-[32px] font-bold text-[#1E293B] mb-3">Test Practice</h1>
                        <p className="text-[#64748B] text-lg">Practice with mock tests and improve your preparation</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                        {testStats.map((stat) => (
                            <div key={stat.label} className="bg-white px-5 py-5 rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-5 border border-gray-100">
                                <div className="flex-shrink-0">
                                    {getIcon(stat.icon, stat.color)}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[28px] font-bold text-[#1E293B] leading-none">{stat.value}</p>
                                    <p className="text-[13px] font-medium text-[#94A3B8] mt-1">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Available Tests Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableTests.map((test) => (
                            <div
                                key={test.id}
                                className="bg-white rounded-[12px] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200 flex flex-col justify-between"
                                style={{ padding: '1px', borderRadius: '12px' }}
                            >
                                <div className="p-6 flex flex-col gap-4">
                                    <h3 className="text-[17px] font-bold text-[#1E293B] leading-snug">
                                        {test.title}
                                    </h3>

                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-0.5 bg-white text-black border border-gray-300 rounded-full text-[12px] font-bold">
                                            {test.difficulty}
                                        </span>
                                        <span className="px-3 py-0.5 bg-[#F97316] text-white rounded-full text-[12px] font-bold">
                                            {test.questions} Questions
                                        </span>
                                    </div>

                                    <div className="space-y-2.5 pt-1">
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-[#94A3B8] font-normal">Duration:</span>
                                            <span className="font-semibold text-[#1E293B]">{test.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-[#94A3B8] font-normal">Attempts:</span>
                                            <span className="font-semibold text-[#1E293B]">{test.attempts}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[14px]">
                                            <span className="text-[#94A3B8] font-normal">Rating:</span>
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold text-[#1E293B]">{test.rating}</span>
                                                <Star className="w-4 h-4 text-[#FACC15] fill-[#FACC15]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => navigate(`/test-practice/${test.id}`)}
                                        className="w-full h-[44px] bg-[#017CBA] text-white text-[15px] font-bold rounded-[10px] hover:bg-[#0169a0] active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        Start Test
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TestPractice;

