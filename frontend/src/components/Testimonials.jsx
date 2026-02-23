import React from "react";
import testimonials from "../assets/dummyTestimonial";
import { Star, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">
                        Success Stories
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Hear from our students who achieved their dreams with our guidance
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
                        >
                            {/* Header row: Quote & Stars */}
                            <div className="flex justify-between items-start mb-6">
                                <Quote className="w-10 h-10 text-gray-800 rotate-180" />
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 text-yellow-500 fill-yellow-500"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <p className="text-gray-500 text-base leading-relaxed mb-8 italic">
                                "{t.message}"
                            </p>

                            <div className="mt-auto">
                                {/* Divider */}
                                <div className="h-px bg-gray-100 w-full mb-6" />

                                {/* Author & Pin row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{t.name}</p>
                                            <p className="text-[11px] text-gray-400 font-medium truncate">{t.role}</p>
                                        </div>
                                    </div>
                                    {/* Tag/Badge */}
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg border border-blue-100">
                                        {t.tag}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col items-center gap-6 mt-16">
                    <p className="text-gray-500 text-sm font-medium">Join thousands of successful students</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => navigate("/courses")}
                            className="px-10 py-3.5 bg-[#017CBA] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                        >
                            Explore Courses
                        </button>
                        <button
                            onClick={() => navigate("/about")}
                            className="px-8 py-3.5 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            View All Success Stories
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
