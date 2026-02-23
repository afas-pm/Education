import React from "react";
import { useNavigate } from "react-router-dom";
import { testStats, availableTests } from "../assets/dummyTestPractice";
import { Layout, CheckCircle, BarChart3, Clock, Star, PlayCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TestPractice = () => {
    const navigate = useNavigate();

    const icons = [BarChart3, CheckCircle, PlayCircle, Clock];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Practice</h1>
                        <p className="text-gray-500">Practice with mock tests and improve your preparation</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {testStats.map((stat, idx) => {
                            const Icon = icons[idx];
                            return (
                                <div key={stat.label} className={`${stat.bg} p-6 rounded-2xl border border-white shadow-sm flex items-center gap-4`}>
                                    <div className={`${stat.color} p-3 bg-white rounded-xl shadow-sm`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Available Tests Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableTests.map((test) => (
                            <div key={test.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                                <div className="p-6 pb-0 flex flex-col">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${test.difficulty === "High" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                            }`}>
                                            {test.difficulty}
                                        </span>
                                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-bold uppercase tracking-wider">
                                            {test.questions} Questions
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
                                        {test.title}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>Duration:</span>
                                            <span className="font-semibold text-gray-900">{test.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>Attempts:</span>
                                            <span className="font-semibold text-gray-900">{test.attempts}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>Rating:</span>
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold text-gray-900">{test.rating}</span>
                                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 pt-2 mt-auto">
                                    <button
                                        onClick={() => navigate(`/test-practice/${test.id}`)}
                                        className="w-full py-3 bg-[#017CBA] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
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
