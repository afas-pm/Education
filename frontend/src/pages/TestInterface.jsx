import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timer, Send, Flag, CheckCircle2, Circle, ChevronLeft, ChevronRight, Eraser, Save } from "lucide-react";
import { examQuestions } from "../assets/dummyTestPractice";

const TestInterface = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [status, setStatus] = useState(new Array(examQuestions.length).fill('unvisited'));
    const [timeLeft, setTimeLeft] = useState(5344); // 01:29:04 in seconds (demo)

    const currentQuestion = examQuestions[currentQuestionIdx];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (optionId) => {
        const newAnswers = { ...selectedAnswers, [currentQuestionIdx]: optionId };
        setSelectedAnswers(newAnswers);

        const newStatus = [...status];
        if (newStatus[currentQuestionIdx] !== 'flagged') {
            newStatus[currentQuestionIdx] = 'answered';
        }
        setStatus(newStatus);
    };

    const handleClear = () => {
        const newAnswers = { ...selectedAnswers };
        delete newAnswers[currentQuestionIdx];
        setSelectedAnswers(newAnswers);

        const newStatus = [...status];
        newStatus[currentQuestionIdx] = 'unvisited';
        setStatus(newStatus);
    };

    const handleFlag = (idx) => {
        const newStatus = [...status];
        newStatus[idx] = newStatus[idx] === 'flagged' ? (selectedAnswers[idx] ? 'answered' : 'unvisited') : 'flagged';
        setStatus(newStatus);
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < examQuestions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit the test?")) {
            navigate(`/test-results/${id}`);
        }
    };

    return (
        <div className="h-screen bg-[#F8F9FD] flex flex-col font-sans overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-30">
                <div className="flex flex-col">
                    <h1 className="font-bold text-gray-900 leading-tight">Plus Two Bio science - Complete Course</h1>
                    <p className="text-xs text-blue-600 font-medium tracking-wide">Question {currentQuestionIdx + 1} of {examQuestions.length}</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl">
                        <Timer className="w-5 h-5 text-gray-500" />
                        <span className="font-mono text-lg font-bold text-gray-800">{formatTime(timeLeft)}</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-[#017CBA] text-white font-bold rounded-xl text-sm shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Submit Test
                    </button>
                </div>
            </header>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-200 h-2 flex z-20">
                <div className="bg-blue-500 transition-all h-full" style={{ width: '40%' }}></div>
                <div className="bg-orange-500 transition-all h-full" style={{ width: '60%' }}></div>
            </div>

            <div className="flex-grow flex overflow-hidden">
                {/* Main Exam Area */}
                <main className="flex-grow p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            {/* Question Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                <h3 className="text-xl font-black text-gray-900">Question {currentQuestionIdx + 1}</h3>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-lg border border-gray-100 tracking-wider">
                                        Physics
                                    </span>
                                    <button
                                        onClick={() => handleFlag(currentQuestionIdx)}
                                        className={`p-2 transition-colors rounded-lg border ${status[currentQuestionIdx] === 'flagged' ? "bg-yellow-50 text-yellow-600 border-yellow-200" : "bg-gray-50 text-gray-400 border-gray-100"
                                            }`}
                                    >
                                        <Flag className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            </div>

                            {/* Question Content */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-snug">
                                    {currentQuestion.question}
                                </h2>

                                <div className="space-y-4">
                                    {currentQuestion.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswerSelect(option.id)}
                                            className={`w-full group flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${selectedAnswers[currentQuestionIdx] === option.id
                                                    ? "bg-blue-50/50 border-blue-500 shadow-md shadow-blue-500/5"
                                                    : "bg-white border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${selectedAnswers[currentQuestionIdx] === option.id
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-50 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500"
                                                }`}>
                                                {option.id}
                                            </div>
                                            <span className={`text-lg font-medium ${selectedAnswers[currentQuestionIdx] === option.id ? "text-blue-900" : "text-gray-700"
                                                }`}>
                                                {option.text}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between mt-8">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestionIdx === 0}
                                className="px-6 py-3 flex items-center gap-2 text-sm font-bold text-gray-400 disabled:opacity-30 hover:text-gray-600 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleClear}
                                    className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
                                >
                                    <Eraser className="w-4 h-4" />
                                    Clear Response
                                </button>
                                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save & Next
                                </button>
                                <button
                                    onClick={nextQuestion}
                                    className="px-8 py-3 bg-[#017CBA] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 hover:bg-blue-700 transition-all flex items-center gap-2"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Navigation Panel */}
                <aside className="w-80 bg-white border-l border-gray-200 p-8 flex flex-col z-10">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 font-sans">Question Navigation</h4>

                    {/* Numbers Grid */}
                    <div className="grid grid-cols-5 gap-3 mb-10">
                        {examQuestions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQuestionIdx(idx)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all ${currentQuestionIdx === idx
                                        ? "bg-[#017CBA] text-white shadow-lg shadow-blue-500/20 scale-110"
                                        : status[idx] === 'answered'
                                            ? "bg-gray-200 text-gray-600"
                                            : status[idx] === 'flagged'
                                                ? "bg-yellow-400 text-white"
                                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="space-y-4 mb-10 pb-10 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-emerald-500 rounded-md"></div>
                            <span className="text-xs font-bold text-gray-500">Answered (0)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-yellow-400 rounded-md"></div>
                            <span className="text-xs font-bold text-gray-500">Flagged (0)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-400 rounded-md"></div>
                            <span className="text-xs font-bold text-gray-500">Skipped</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-gray-100 rounded-md border border-gray-200"></div>
                            <span className="text-xs font-bold text-gray-500">Not Visited</span>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="mt-auto">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-red-500/10 text-red-600 font-black rounded-2xl hover:bg-red-500/20 transition-all text-sm tracking-wide"
                        >
                            Submit Test
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TestInterface;
