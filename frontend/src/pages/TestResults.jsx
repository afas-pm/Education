import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockResults, examQuestions } from "../assets/dummyTestPractice";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Download,
    BarChart2,
    RefreshCcw,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import NavbarDesign from "../components/NavbarDesign";
import Footer from "../components/Footer";

const TestResults = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("analysis");
    const [expandedExplanations, setExpandedExplanations] = useState({});

    // ✅ Same navHeight measurement pattern as TestInterface
    const [navHeight, setNavHeight] = useState(70);
    useEffect(() => {
        const el = document.querySelector("nav") || document.querySelector("header");
        if (el) setNavHeight(el.offsetHeight);
    }, []);

    const toggleExplanation = (id) => {
        setExpandedExplanations((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans">

            {/* ✅ NavbarDesign — fixed, same as TestInterface */}
            <NavbarDesign />

            {/* ✅ Spacer — pushes content below fixed navbar, same as TestInterface */}
            <div style={{ height: navHeight }} className="shrink-0" />

            {/* ✅ Main content uses exact same max-w + padding as TestInterface */}
            <main className="flex-grow py-8 pb-16">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

                    {/* ── Page Header ── */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-[22px] font-extrabold text-[#111827] leading-tight">
                                {mockResults.examName}
                            </h1>
                            <p className="text-[13px] text-gray-500 mt-1">
                                Completed on {mockResults.completedDate}
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            Download Report
                        </button>
                    </div>

                    {/* ── Tabs (Toggle Switch Style) ── */}
                    <div className="flex w-full bg-[#F1F5F9] p-1.5 rounded-xl mb-8">
                        <button
                            onClick={() => setActiveTab("analysis")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-bold rounded-lg transition-all ${activeTab === "analysis"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                        >
                            <BarChart2 className="w-4 h-4" />
                            Results &amp; Analysis
                        </button>
                        <button
                            onClick={() => setActiveTab("review")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-bold rounded-lg transition-all ${activeTab === "review"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Review Solutions
                        </button>
                    </div>

                    {/* ══════════════════════════════════════
                        ANALYSIS TAB
                    ══════════════════════════════════════ */}
                    {activeTab === "analysis" ? (
                        <div className="space-y-6">

                            {/* ── Row 1: 4 Summary Cards ── */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                                    <p className="text-[36px] font-black text-emerald-500 leading-none mb-1">
                                        {mockResults.totalScore}
                                    </p>
                                    <p className="text-[11px] text-gray-400 font-medium mb-1">
                                        out of {mockResults.totalQuestions}
                                    </p>
                                    <p className="text-[12px] font-semibold text-gray-700">Total Score</p>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                                    <p className="text-[36px] font-black text-[#017CBA] leading-none mb-1">
                                        {mockResults.percentage}%
                                    </p>
                                    <p className="text-[11px] text-gray-400 font-medium mb-2">Percentage</p>
                                    <span className="inline-block px-3 py-0.5 bg-[#017CBA] text-white text-[10px] font-bold rounded-md">
                                        Excellent
                                    </span>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                                    <p className="text-[36px] font-black text-purple-600 leading-none mb-1">
                                        #{mockResults.rank}
                                    </p>
                                    <p className="text-[11px] text-gray-400 font-medium mb-1">Your Rank</p>
                                    <p className="text-[11px] text-gray-500 font-medium">
                                        out of {mockResults.totalStudents}
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                                    <p className="text-[36px] font-black text-orange-500 leading-none mb-1">
                                        {mockResults.timeTaken}
                                    </p>
                                    <p className="text-[11px] text-gray-400 font-medium mb-1">Time Taken</p>
                                    <p className="text-[11px] text-gray-500 font-medium">
                                        out of {mockResults.totalTime}
                                    </p>
                                </div>
                            </div>

                            {/* ── Row 2: Question Analysis (left 2/3) + Sidebar (right 1/3) ──
                                Uses same lg:grid-cols-12 system as TestInterface for consistency.
                            ── */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                                {/* LEFT — Question Analysis: col-span-8 matches TestInterface question card */}
                                <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                                    <h3 className="text-[15px] font-bold text-[#1E293B] mb-7 flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-[#64748B]" />
                                        Question Analysis
                                    </h3>

                                    {/* Correct / Incorrect / Skipped */}
                                    <div className="flex justify-around items-start mb-10">
                                        {[
                                            {
                                                icon: <CheckCircle2 className="w-6 h-6" />,
                                                bg: "bg-emerald-50 border-emerald-100 text-emerald-500",
                                                count: mockResults.analysis.correct,
                                                label: "Correct",
                                            },
                                            {
                                                icon: <XCircle className="w-6 h-6" />,
                                                bg: "bg-red-50 border-red-100 text-red-500",
                                                count: mockResults.analysis.incorrect,
                                                label: "Incorrect",
                                            },
                                            {
                                                icon: <Clock className="w-6 h-6" />,
                                                bg: "bg-gray-50 border-gray-200 text-gray-400",
                                                count: mockResults.analysis.skipped,
                                                label: "Skipped",
                                            },
                                        ].map(({ icon, bg, count, label }) => (
                                            <div key={label} className="text-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border mx-auto mb-3 ${bg}`}>
                                                    {icon}
                                                </div>
                                                <p className="text-[22px] font-black text-[#1E293B] leading-none">
                                                    {count}
                                                </p>
                                                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1">
                                                    {label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ✅ Topic-wise bars — same dual-color system as TestInterface progress bar */}
                                    <div className="space-y-5">
                                        {mockResults.topicPerformance.map((topic) => (
                                            <div key={topic.topic}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-[13px] font-semibold text-[#1E293B]">
                                                        {topic.topic}
                                                    </span>
                                                    <span className="text-[12px] text-[#94A3B8] font-medium">
                                                        {topic.score} ({topic.percentage}%)
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full overflow-hidden flex">
                                                    <div
                                                        className="h-full bg-[#017CBA] transition-all duration-700"
                                                        style={{ width: `${topic.percentage}%` }}
                                                    />
                                                    <div
                                                        className="h-full bg-[#F97316] flex-grow transition-all duration-700"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT — Sidebar: col-span-4 matches TestInterface sidebar */}
                                <div className="lg:col-span-4 self-start flex flex-col gap-4">

                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                        <h4 className="text-[15px] font-bold text-[#1E293B] mb-5">
                                            Quick Actions
                                        </h4>
                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={() => setActiveTab("review")}
                                                className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-[#475569] bg-white hover:bg-gray-50 transition-all"
                                            >
                                                Review Solutions
                                            </button>
                                            <button className="w-full py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-[#475569] bg-white hover:bg-gray-50 transition-all">
                                                Take Similar Test
                                            </button>
                                            <button
                                                onClick={() => navigate("/test-practice")}
                                                className="w-full py-2.5 bg-[#017CBA] text-white font-bold rounded-lg text-[13px] hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                            >
                                                Back to Tests
                                            </button>
                                        </div>
                                    </div>

                                    {/* Performance Comparison */}
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                        <h4 className="text-[15px] font-bold text-[#1E293B] mb-5">
                                            Performance Comparison
                                        </h4>
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[13px] text-[#64748B]">Your Score</span>
                                                <span className="text-[13px] font-bold text-[#1E293B]">
                                                    {mockResults.comparison.yourScore}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[13px] text-[#64748B]">Average Score</span>
                                                <span className="text-[13px] font-bold text-[#1E293B]">
                                                    {mockResults.comparison.averageScore}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                                <span className="text-[13px] text-[#64748B]">Top Score</span>
                                                <span className="text-[13px] font-bold text-[#1E293B]">
                                                    {mockResults.comparison.topScore}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                            <p className="text-[12px] font-semibold text-[#017CBA] text-center leading-relaxed">
                                                You scored better than {mockResults.comparison.percentile}% of test takers!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (
                        /* ══════════════════════════════════════
                            REVIEW SOLUTIONS TAB
                        ══════════════════════════════════════ */
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[20px] font-black text-[#1E293B]">Review Solutions</h2>
                                <span className="px-4 py-1.5 bg-white border border-gray-200 text-[#64748B] text-[11px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                                    {examQuestions.length} Questions
                                </span>
                            </div>

                            {/* ✅ Review cards: same col-span-8 width as question card in TestInterface */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                <div className="lg:col-span-8 space-y-5">
                                    {examQuestions.map((q, idx) => (
                                        <div
                                            key={q.id}
                                            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all"
                                        >
                                            {/* Question Header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                                                        q.userAnswer === q.correctAnswer
                                                            ? "bg-emerald-50 border-emerald-100 text-emerald-500"
                                                            : "bg-red-50 border-red-100 text-red-500"
                                                    }`}>
                                                        {q.userAnswer === q.correctAnswer
                                                            ? <CheckCircle2 className="w-4 h-4" />
                                                            : <XCircle className="w-4 h-4" />
                                                        }
                                                    </div>
                                                    <h3 className="text-[16px] font-bold text-[#1E293B]">
                                                        Question {idx + 1}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold rounded-lg border border-[#E2E8F0]">
                                                        {q.subject}
                                                    </span>
                                                    <span className="px-3 py-1 bg-orange-500 text-white text-[11px] font-bold rounded-lg">
                                                        {q.marks} marks
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Question Text */}
                                            <p className="text-[15px] font-semibold text-[#475569] mb-6 leading-relaxed">
                                                {q.question}
                                            </p>

                                            {/* Options */}
                                            <div className="flex flex-col gap-2.5 mb-6">
                                                {q.options.map((opt) => {
                                                    const isCorrect    = opt.id === q.correctAnswer;
                                                    const isUserChoice = opt.id === q.userAnswer;
                                                    const isWrong      = isUserChoice && !isCorrect;
                                                    return (
                                                        <div
                                                            key={opt.id}
                                                            className={`flex items-center justify-between px-5 py-3.5 rounded-xl border-2 transition-all ${
                                                                isCorrect
                                                                    ? "bg-green-50 border-green-200"
                                                                    : isWrong
                                                                    ? "bg-red-50 border-red-200"
                                                                    : "bg-white border-gray-100"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${
                                                                    isCorrect
                                                                        ? "bg-green-100 text-green-700"
                                                                        : isWrong
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-[#EEF2F6] text-[#64748B]"
                                                                }`}>
                                                                    {opt.id}
                                                                </div>
                                                                <span className={`text-[13px] font-medium ${
                                                                    isCorrect ? "text-green-700" : isWrong ? "text-red-700" : "text-[#475569]"
                                                                }`}>
                                                                    {opt.text}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                                                {isWrong   && <XCircle      className="w-4 h-4 text-red-500" />}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Footer */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-5 border-t border-gray-100">
                                                <div className="flex items-center gap-3 text-[12px] font-semibold text-[#94A3B8]">
                                                    <span>
                                                        Your answer:{" "}
                                                        <span className={q.userAnswer === q.correctAnswer ? "text-emerald-600" : "text-red-500"}>
                                                            {q.userAnswer}
                                                        </span>
                                                    </span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                    <span>
                                                        Correct answer:{" "}
                                                        <span className="text-emerald-600">{q.correctAnswer}</span>
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => toggleExplanation(q.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-semibold text-[#475569] hover:bg-gray-50 transition-all shadow-sm"
                                                >
                                                    {expandedExplanations[q.id]
                                                        ? <ChevronUp   className="w-3.5 h-3.5" />
                                                        : <ChevronDown className="w-3.5 h-3.5" />
                                                    }
                                                    {expandedExplanations[q.id] ? "Hide Explanation" : "Show Explanation"}
                                                </button>
                                            </div>

                                            {/* Explanation */}
                                            {expandedExplanations[q.id] && (
                                                <div className="mt-4 p-5 bg-blue-50 border border-blue-100 rounded-xl">
                                                    <h4 className="text-[10px] font-black text-[#017CBA] uppercase tracking-widest mb-2">
                                                        Explanation
                                                    </h4>
                                                    <p className="text-[13px] font-medium text-[#475569] leading-relaxed">
                                                        {q.explanation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* ✅ Sticky summary sidebar on review tab — col-span-4 */}
                                <div className="lg:col-span-4 self-start" style={{ position: "sticky", top: navHeight + 16 }}>
                                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                        <h4 className="text-[13px] font-bold text-[#1E293B] mb-4">Summary</h4>
                                        <div className="space-y-3 mb-5">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-[13px] text-[#64748B]">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    Correct
                                                </span>
                                                <span className="text-[13px] font-bold text-emerald-600">
                                                    {mockResults.analysis.correct}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-[13px] text-[#64748B]">
                                                    <XCircle className="w-4 h-4 text-red-500" />
                                                    Incorrect
                                                </span>
                                                <span className="text-[13px] font-bold text-red-500">
                                                    {mockResults.analysis.incorrect}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-[13px] text-[#64748B]">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    Skipped
                                                </span>
                                                <span className="text-[13px] font-bold text-[#94A3B8]">
                                                    {mockResults.analysis.skipped}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab("analysis")}
                                            className="w-full py-2.5 flex items-center justify-center gap-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-[#475569] bg-white hover:bg-gray-50 transition-all"
                                        >
                                            <BarChart2 className="w-4 h-4 text-[#64748B]" />
                                            Back to Analysis
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TestResults;