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
                <div className="text-center mb-12 md:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Success Stories
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                        Hear from our students who achieved their dreams with our guidance
                    </p>
                </div>

                {/* Testimonials Grid — 3x2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="bg-gray-50 border border-gray-100 rounded-xl p-5 sm:p-6 hover:shadow-md hover:border-blue-100 transition-all duration-300"
                        >
                            {/* Quote icon */}
                            <div className="text-4xl font-serif text-yellow-400 leading-none mb-2 select-none">"</div>

                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.round(t.rating)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Message */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                                "{t.message}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{t.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <button
                        onClick={() => navigate("/courses")}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg text-sm hover:shadow-lg transition-all cursor-pointer"
                    >
                        Explore Courses
                    </button>
                    <button
                        onClick={() => navigate("/about")}
                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                    >
                        View All Success Stories
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
