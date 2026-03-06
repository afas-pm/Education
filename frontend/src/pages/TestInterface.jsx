import { Timer, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { examQuestions } from "../assets/dummyTestPractice";
import NavbarDesign from "../components/NavbarDesign";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TestInterface = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [status, setStatus] = useState(new Array(examQuestions.length).fill("unvisited"));
    const [timeLeft, setTimeLeft] = useState(5344);
    const [navHeight, setNavHeight] = useState(70); // default fallback

    const navRef = useRef(null);

    // Measure the actual navbar height so sub-header sticks right below it
    useEffect(() => {
        const el = document.querySelector("nav") || document.querySelector("header");
        if (el) setNavHeight(el.offsetHeight);
    }, []);

    const currentQuestion = examQuestions[currentQuestionIdx];

    // Mark as visited on navigation
    useEffect(() => {
        setStatus((prev) => {
            const updated = [...prev];
            if (updated[currentQuestionIdx] === "unvisited") {
                updated[currentQuestionIdx] = "visited";
            }
            return updated;
        });
    }, [currentQuestionIdx]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleAnswerSelect = (optionId) => {
        setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIdx]: optionId }));
        setStatus((prev) => {
            const updated = [...prev];
            if (updated[currentQuestionIdx] !== "flagged") updated[currentQuestionIdx] = "answered";
            return updated;
        });
    };

    const handleClear = () => {
        setSelectedAnswers((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionIdx];
            return updated;
        });
        setStatus((prev) => {
            const updated = [...prev];
            updated[currentQuestionIdx] = "unvisited";
            return updated;
        });
    };

    const handleFlag = (idx) => {
        setStatus((prev) => {
            const updated = [...prev];
            updated[idx] =
                updated[idx] === "flagged"
                    ? selectedAnswers[idx] ? "answered" : "unvisited"
                    : "flagged";
            return updated;
        });
    };

    const handleSaveAndNext = () => {
        if (selectedAnswers[currentQuestionIdx] !== undefined) {
            setStatus((prev) => {
                const updated = [...prev];
                if (updated[currentQuestionIdx] !== "flagged") updated[currentQuestionIdx] = "answered";
                return updated;
            });
        }
        if (currentQuestionIdx < examQuestions.length - 1) setCurrentQuestionIdx((prev) => prev + 1);
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < examQuestions.length - 1) setCurrentQuestionIdx((prev) => prev + 1);
    };

    const prevQuestion = () => {
        if (currentQuestionIdx > 0) setCurrentQuestionIdx((prev) => prev - 1);
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit the test?")) navigate(`/test-results/${id}`);
    };

    const answeredCount = status.filter((s) => s === "answered").length;
    const flaggedCount  = status.filter((s) => s === "flagged").length;
    const skippedCount  = status.filter((s) => s === "skipped").length;

    // Blue = current position progress, orange = remaining — always both visible
    const bluePct   = Math.round(((currentQuestionIdx + 1) / examQuestions.length) * 100);
    const orangePct = 100 - bluePct;

    return (
        <div className="min-h-screen bg-[#EAECF0] flex flex-col font-sans">

            {/* ── NavbarDesign is fixed — renders on top of everything ── */}
            <NavbarDesign />

            {/* ════════════════════════════════════════════════════
                SPACER: pushes all page content below the fixed navbar.
                Height matches navHeight measured from the DOM.
            ════════════════════════════════════════════════════ */}
            <div style={{ height: navHeight }} className="shrink-0" />

            {/* ════════════════════════════════════════════════════
                STICKY SUB-HEADER
                top = navHeight so it sticks right below the navbar,
                never overlapping it or hiding behind it.
            ════════════════════════════════════════════════════ */}
            <div
                className="sticky z-40 bg-white border-b border-gray-200 shadow-sm"
                style={{ top: navHeight }}
            >
                {/* Title row */}
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-[17px] font-bold text-[#1E293B] leading-tight">
                            Plus Two Bio science - Complete Course
                        </h1>
                        <p className="text-[13px] text-[#64748B] mt-0.5">
                            Question {currentQuestionIdx + 1} of {examQuestions.length}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Timer chip */}
                        <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg px-3.5 py-2">
                            <Timer className="w-4 h-4 text-[#64748B]" />
                            <span className="font-mono text-[15px] font-bold text-[#1E293B] tracking-wide">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                        {/* Submit Test */}
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 border border-[#D1D5DB] rounded-lg text-[13px] font-semibold text-[#374151] bg-white hover:bg-gray-50 transition-all"
                        >
                            Submit Test
                        </button>
                    </div>
                </div>

                {/* Dual-color progress bar — constrained to content width */}
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-3">
                    <div className="w-full h-2.5 rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-[#017CBA] transition-all duration-500"
                            style={{ width: `${bluePct}%` }}
                        />
                        <div
                            className="h-full bg-[#F97316] transition-all duration-500"
                            style={{ width: `${orangePct}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Page Body ── */}
            <main className="flex-grow py-8">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                        {/* ── Left: Question Card + Bottom Actions ── */}
                        <div className="lg:col-span-8 flex flex-col gap-4">

                            {/* Question card */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">

                                {/* Card header */}
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-[15px] font-bold text-[#1E293B]">
                                        Question {currentQuestionIdx + 1}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3.5 py-1 text-[12px] font-medium text-[#475569] bg-white border border-gray-200 rounded-full">
                                            {currentQuestion.subject ?? "physics"}
                                        </span>
                                        <button
                                            onClick={() => handleFlag(currentQuestionIdx)}
                                            className={`p-1.5 rounded-lg border transition-colors ${
                                                status[currentQuestionIdx] === "flagged"
                                                    ? "bg-[#FFFBEB] text-[#EAB308] border-[#FEF3C7]"
                                                    : "bg-white text-[#94A3B8] border-gray-200 hover:bg-gray-50"
                                            }`}
                                        >
                                            <Flag className={`w-4 h-4 ${status[currentQuestionIdx] === "flagged" ? "fill-current" : ""}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Question text */}
                                <p className="text-[17px] font-bold text-[#1E293B] mb-7 leading-snug">
                                    {currentQuestion.question}
                                </p>

                                {/* Options */}
                                <div className="flex flex-col gap-3">
                                    {currentQuestion.options.map((option) => {
                                        const isSelected = selectedAnswers[currentQuestionIdx] === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleAnswerSelect(option.id)}
                                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all ${
                                                    isSelected
                                                        ? "border-[#017CBA] bg-white shadow-sm"
                                                        : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                                                    isSelected ? "bg-[#017CBA] text-white" : "bg-[#EEF2F6] text-[#64748B]"
                                                }`}>
                                                    {option.id}
                                                </div>
                                                <span className={`text-[15px] font-medium ${isSelected ? "text-[#1E293B]" : "text-[#475569]"}`}>
                                                    {option.text}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom action row — 3-zone grid */}
                            <div className="grid grid-cols-3 items-center">

                                {/* Zone 1 — Previous */}
                                <div className="flex justify-start">
                                    <button
                                        onClick={prevQuestion}
                                        disabled={currentQuestionIdx === 0}
                                        className="flex items-center gap-1.5 px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-[#475569] bg-white hover:bg-gray-50 disabled:opacity-40 transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>
                                </div>

                                {/* Zone 2 — Clear + Save & Next (centered) */}
                                <div className="flex justify-center items-center gap-3">
                                    <button
                                        onClick={handleClear}
                                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-[#475569] bg-white hover:bg-gray-50 transition-all"
                                    >
                                        Clear Response
                                    </button>
                                    <button
                                        onClick={handleSaveAndNext}
                                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-[#475569] bg-white hover:bg-gray-50 transition-all"
                                    >
                                        Save &amp; Next
                                    </button>
                                </div>

                                {/* Zone 3 — Next */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={nextQuestion}
                                        disabled={currentQuestionIdx === examQuestions.length - 1}
                                        className="flex items-center gap-1.5 px-6 py-2.5 bg-[#017CBA] text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-40 transition-all shadow-md shadow-blue-100"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Sidebar ── */}
                        <div className="lg:col-span-4 self-start">
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-4">
                                    Question Navigation
                                </h4>

                                {/* Question number buttons */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {examQuestions.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentQuestionIdx(idx)}
                                            className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all border ${
                                                currentQuestionIdx === idx
                                                    ? "bg-[#017CBA] text-white border-[#017CBA] shadow-md shadow-blue-100"
                                                    : status[idx] === "answered"
                                                    ? "bg-[#22C55E] text-white border-[#22C55E]"
                                                    : status[idx] === "flagged"
                                                    ? "bg-[#EAB308] text-white border-[#EAB308]"
                                                    : status[idx] === "skipped"
                                                    ? "bg-[#EF4444] text-white border-[#EF4444]"
                                                    : "bg-[#F1F5F9] text-[#94A3B8] border-[#E2E8F0]"
                                            }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="space-y-2.5 mb-5">
                                    {[
                                        { color: "#22C55E", label: `Answered (${answeredCount})` },
                                        { color: "#EAB308", label: `Flagged (${flaggedCount})` },
                                        { color: "#EF4444", label: `Skipped (${skippedCount})` },
                                        { color: "#CBD5E1", label: "Not Visited" },
                                    ].map(({ color, label }) => (
                                        <div key={label} className="flex items-center gap-3">
                                            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                            <span className="text-[13px] text-[#475569]">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Submit Test */}
                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-3 bg-[#EF4444] text-white font-bold rounded-xl hover:bg-red-600 transition-all text-[14px] shadow-lg shadow-red-100"
                                >
                                    Submit Test
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default TestInterface;