import React, { useState } from "react";
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TestResults = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("analysis");
    const [expandedExplanations, setExpandedExplanations] = useState({});

    const toggleExplanation = (id) => {
        setExpandedExplanations(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-[#111827] mb-2">{mockResults.examName}</h1>
                            <p className="text-gray-500 font-medium text-sm">Completed on {mockResults.completedDate}</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                            <Download className="w-4 h-4" />
                            Download Report
                        </button>
                    </div>

                    {/* Navigation Tab */}
                    <div className="flex items-center gap-2 mb-10 bg-gray-200/50 p-1.5 rounded-2xl w-fit">
                        <button onClick={() => setActiveTab("analysis")} className={`px-10 py-2.5 font-bold rounded-xl shadow-sm text-xs flex items-center gap-2 transition-all ${activeTab === 'analysis' ? "bg-white text-gray-800 shadow-sm"
                            : "text-gray-500 hover:bg-white/30"
                            }`}>
                            <BarChart2 className="w-4 h-4" />
                            Results & Analysis
                        </button>
                        <button onClick={() => setActiveTab("review")} className={`px-10 py-2.5 font-bold rounded-xl text-xs flex items-center gap-2 transition-all  ${activeTab === 'review' ? "bg-white text-gray-800 shadow-sm"
                            : "text-gray-500 hover:bg-white/30"
                            }`}>
                            <RefreshCcw className="w-4 h-4" />
                            Review Solutions
                        </button>
                    </div>

                    {activeTab === 'analysis' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Summary Cards Row */}
                            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-emerald-500 mb-1">{mockResults.totalScore}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">out of {mockResults.totalQuestions}</p>
                                    <p className="text-xs font-bold text-gray-700">Total Score</p>
                                </div>
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center font-sans">
                                    <p className="text-4xl font-black text-blue-500 mb-2">{mockResults.percentage}%</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Percentage</p>
                                    <div className="inline-block px-3 py-1 bg-[#017CBA] text-white text-[9px] font-black rounded-lg uppercase tracking-widest">
                                        Excellent
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-purple-600 mb-1">#{mockResults.rank}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Your Rank</p>
                                    <p className="text-[10px] font-bold text-gray-500 mt-1">out of {mockResults.totalStudents}</p>
                                </div>
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-orange-500 mb-1">{mockResults.timeTaken}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time Taken</p>
                                    <p className="text-[10px] font-bold text-gray-500 mt-1">out of {mockResults.totalTime}</p>
                                </div>
                            </div>

                            {/* Main Analysis Column */}
                            <div className="lg:col-span-3">
                                <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm h-full">
                                    <h3 className="text-xl font-black text-gray-900 mb-10 flex items-center gap-3">
                                        <BarChart2 className="w-5 h-5 text-gray-700" />
                                        Question Analysis
                                    </h3>

                                    <div className="flex justify-around items-center mb-16 px-10">
                                        <div className="text-center group">
                                            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 transition-transform group-hover:scale-105">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                            <p className="text-2xl font-black text-gray-900 leading-none">{mockResults.analysis.correct}</p>
                                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-2 px-4">Correct</p>
                                        </div>
                                        <div className="text-center group">
                                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100 transition-transform group-hover:scale-105">
                                                <XCircle className="w-8 h-8" />
                                            </div>
                                            <p className="text-2xl font-black text-gray-900 leading-none">{mockResults.analysis.incorrect}</p>
                                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-2 px-4">Incorrect</p>
                                        </div>
                                        <div className="text-center group">
                                            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 transition-transform group-hover:scale-105">
                                                <Clock className="w-8 h-8" />
                                            </div>
                                            <p className="text-2xl font-black text-gray-900 leading-none">{mockResults.analysis.skipped}</p>
                                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-2 px-4">Skipped</p>
                                        </div>
                                    </div>

                                    {/* Topic-wise performance with dual bars */}
                                    <div className="space-y-8">
                                        {mockResults.topicPerformance.map((topic) => (
                                            <div key={topic.topic}>
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{topic.topic}</span>
                                                    <span className="text-[11px] font-bold text-gray-400">{topic.score} ({topic.percentage}%)</span>
                                                </div>
                                                <div className="h-2.5 bg-orange-500 rounded-full overflow-hidden flex">
                                                    <div
                                                        className="h-full bg-[#017CBA] transition-all duration-1000"
                                                        style={{ width: `${topic.percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Column */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                {/* Quick Actions */}
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                                    <h4 className="text-lg font-black text-gray-900 mb-6 font-sans">Quick Actions</h4>
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setActiveTab('review')}
                                            className="w-full py-3.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center"
                                        >
                                            Review Solutions
                                        </button>
                                        <button className="w-full py-3.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center">
                                            Take Similar Test
                                        </button>
                                        <button
                                            onClick={() => navigate("/test-practice")}
                                            className="w-full py-3.5 bg-[#017CBA] text-white font-black rounded-xl text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
                                        >
                                            Back to Tests
                                        </button>
                                    </div>
                                </div>

                                {/* Performance Comparison */}
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                                    <h4 className="text-lg font-black text-gray-900 mb-6 font-sans tracking-tight">Performance Comparison</h4>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-gray-500">Your Score</span>
                                            <span className="text-sm font-black text-gray-900">{mockResults.comparison.yourScore}%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-gray-500">Average Score</span>
                                            <span className="text-sm font-black text-gray-900">{mockResults.comparison.averageScore}%</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-gray-50 pb-5">
                                            <span className="text-xs font-bold text-gray-500">Top Score</span>
                                            <span className="text-sm font-black text-gray-900">{mockResults.comparison.topScore}%</span>
                                        </div>
                                        <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                                            <p className="text-[11px] font-bold text-blue-600 leading-relaxed text-center">
                                                You scored better than {mockResults.comparison.percentile}% of test takers!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500 max-w-5xl mx-auto">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-black text-gray-900 leading-tight">Review Solutions</h2>
                                <span className="px-4 py-1.5 bg-white border border-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                    {examQuestions.length} Questions
                                </span>
                            </div>

                            <div className="space-y-6">
                                {examQuestions.map((q, idx) => (
                                    <div key={q.id} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm transition-all hover:shadow-md">
                                        {/* Question Header */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${q.userAnswer === q.correctAnswer
                                                        ? "bg-emerald-50 border-emerald-100 text-emerald-500"
                                                        : "bg-red-50 border-red-100 text-red-500"
                                                    }`}>
                                                    {q.userAnswer === q.correctAnswer ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900">Question {idx + 1}</h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                                                    {q.subject}
                                                </span>
                                                <span className="px-3 py-1 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                                                    {q.marks} marks
                                                </span>
                                            </div>
                                        </div>

                                        {/* Question Text */}
                                        <p className="text-base font-bold text-gray-700 mb-8 leading-relaxed">
                                            {q.question}
                                        </p>

                                        {/* Options Grid */}
                                        <div className="space-y-3 mb-8">
                                            {q.options.map((opt) => {
                                                const isCorrect = opt.id === q.correctAnswer;
                                                const isUserChoice = opt.id === q.userAnswer;
                                                const isWrongChoice = isUserChoice && !isCorrect;

                                                return (
                                                    <div
                                                        key={opt.id}
                                                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${isCorrect
                                                                ? "bg-green-50 border-green-400/30 ring-1 ring-green-400/20"
                                                                : isWrongChoice
                                                                    ? "bg-red-50 border-red-400/30 ring-1 ring-red-400/20"
                                                                    : "bg-white border-gray-100"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <span className={`text-sm font-extrabold ${isCorrect ? "text-green-700" : isWrongChoice ? "text-red-700" : "text-gray-500"
                                                                }`}>
                                                                {opt.id}. {opt.text}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {isUserChoice && (
                                                                <div className={`w-2 h-2 rounded-full ${isCorrect ? "bg-emerald-500" : "bg-red-500"}`}></div>
                                                            )}
                                                            {isCorrect && (
                                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                            )}
                                                            {isWrongChoice && (
                                                                <XCircle className="w-5 h-5 text-red-500" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Footer Info Row */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-gray-50">
                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                                                <span>Your answer: <span className={q.userAnswer === q.correctAnswer ? "text-emerald-600" : "text-red-500"}>{q.userAnswer}</span></span>
                                                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                                <span>Correct answer: <span className="text-emerald-600">{q.correctAnswer}</span></span>
                                            </div>
                                            <button
                                                onClick={() => toggleExplanation(q.id)}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                                            >
                                                {expandedExplanations[q.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                                {expandedExplanations[q.id] ? "Hide Explanation" : "Show Explanation"}
                                            </button>
                                        </div>

                                        {/* Animated Explanation Box */}
                                        {expandedExplanations[q.id] && (
                                            <div className="mt-4 p-6 bg-blue-50/30 border border-blue-100 rounded-2xl animate-in slide-in-from-top-2 duration-300">
                                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Explanation</h4>
                                                <p className="text-sm font-bold text-gray-600 leading-relaxed">
                                                    {q.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Navigation */}
                            <div className="flex flex-col items-center gap-4 pt-10">
                                <button
                                    onClick={() => setActiveTab('analysis')}
                                    className="px-10 py-4 bg-white border border-gray-200 text-gray-700 font-black rounded-[20px] text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-3 group"
                                >
                                    <BarChart2 className="w-5 h-5 text-gray-400 transition-colors group-hover:text-[#017CBA]" />
                                    Back to Results Analysis
                                </button>
                                <p className="text-xs font-bold text-gray-400">Review all your answers above carefully</p>
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
