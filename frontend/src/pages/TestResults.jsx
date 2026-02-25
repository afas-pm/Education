import React from "react";
import { useNavigate } from "react-router-dom";
import { mockResults } from "../assets/dummyTestPractice";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Download,
    BarChart2,
    RefreshCcw,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TestResults = () => {
    const navigate = useNavigate();

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
                        <button className="px-10 py-2.5 bg-white text-gray-800 font-bold rounded-xl shadow-sm text-xs flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" />
                            Results & Analysis
                        </button>
                        <button className="px-10 py-2.5 text-gray-500 font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-white/50 transition-all">
                            <RefreshCcw className="w-4 h-4" />
                            Review Solutions
                        </button>
                    </div>

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
                                    <button className="w-full py-3.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center">
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
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TestResults;