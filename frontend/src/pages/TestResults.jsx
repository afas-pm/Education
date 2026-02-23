import React from "react";
import { useNavigate } from "react-router-dom";
import { mockResults } from "../assets/dummyTestPractice";
import { CheckCircle2, XCircle, Clock, Download, ChevronRight, BarChart2, RefreshCcw, Home } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TestResults = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{mockResults.examName}</h1>
                            <p className="text-gray-500 font-medium">Completed on {mockResults.completedDate}</p>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                            <Download className="w-4 h-4" />
                            Download Report
                        </button>
                    </div>

                    {/* Navigation Tab */}
                    <div className="flex items-center gap-4 mb-8 bg-gray-100/50 p-1.5 rounded-2xl w-fit">
                        <button className="px-8 py-3 bg-white text-gray-800 font-bold rounded-xl shadow-sm text-sm flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" />
                            Results & Analysis
                        </button>
                        <button className="px-8 py-3 text-gray-400 font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-white hover:text-gray-600 transition-all">
                            <RefreshCcw className="w-4 h-4" />
                            Review Solutions
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary Cards */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-emerald-500 mb-1">{mockResults.totalScore}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">out of {mockResults.totalQuestions}</p>
                                    <p className="text-xs font-bold text-gray-700 mt-2">Total Score</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-blue-500 mb-1">{mockResults.percentage}%</p>
                                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">Excellent</span>
                                    <p className="text-xs font-bold text-gray-700 mt-2">Percentage</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-purple-500 mb-1">#{mockResults.rank}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">out of {mockResults.totalStudents}</p>
                                    <p className="text-xs font-bold text-gray-700 mt-2">Your Rank</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                                    <p className="text-4xl font-black text-orange-500 mb-1">{mockResults.timeTaken}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">out of {mockResults.totalTime}</p>
                                    <p className="text-xs font-bold text-gray-700 mt-2">Time Taken</p>
                                </div>
                            </div>

                            {/* Question Analysis */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-blue-600" />
                                    Question Analysis
                                </h3>

                                <div className="grid grid-cols-3 gap-8 mb-12">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <p className="text-2xl font-black text-gray-900">{mockResults.analysis.correct}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Correct</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <XCircle className="w-6 h-6" />
                                        </div>
                                        <p className="text-2xl font-black text-gray-900">{mockResults.analysis.incorrect}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Incorrect</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <p className="text-2xl font-black text-gray-900">{mockResults.analysis.skipped}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Skipped</p>
                                    </div>
                                </div>

                                {/* Topic-wise performance */}
                                <div className="space-y-6">
                                    {mockResults.topicPerformance.map((topic) => (
                                        <div key={topic.topic}>
                                            <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                                                <span className="text-gray-900">{topic.topic}</span>
                                                <span className="text-gray-400">{topic.score} ({topic.percentage}%)</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#017CBA] rounded-full transition-all duration-1000"
                                                    style={{ width: `${topic.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="space-y-8">
                            {/* Quick Actions */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h4>
                                <div className="space-y-4">
                                    <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                        Review Solutions
                                    </button>
                                    <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                        Take Similar Test
                                    </button>
                                    <button
                                        onClick={() => navigate("/test-practice")}
                                        className="w-full py-4 bg-[#017CBA] text-white font-bold rounded-2xl text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                                    >
                                        Back to Tests
                                    </button>
                                </div>
                            </div>

                            {/* Performance Comparison */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-6">Performance Comparison</h4>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Your Score</span>
                                        <span className="text-sm font-bold text-gray-900">{mockResults.comparison.yourScore}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Average Score</span>
                                        <span className="text-sm font-bold text-gray-900">{mockResults.comparison.averageScore}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Top Score</span>
                                        <span className="text-sm font-bold text-gray-900">{mockResults.comparison.topScore}%</span>
                                    </div>
                                    <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                                        <p className="text-xs font-bold text-blue-600 leading-relaxed text-center">
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
