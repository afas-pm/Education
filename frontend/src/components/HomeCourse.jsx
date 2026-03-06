import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { dummyCourses } from '../assets/dummyCourses';

const HomeCourse = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 md:py-24 bg-[#f8fafc]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e293b] mb-6 font-sans">
                        Popular Courses
                    </h2>
                    <p className="text-[#64748b] max-w-2xl mx-auto text-base sm:text-lg">
                        Join thousands of students already learning with our top-rated courses
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {dummyCourses.slice(0, 4).map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full"
                            onClick={() => navigate(`/courses/${course.id}`)}
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay status badges */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-[#2563eb] text-white text-[10px] font-bold rounded-full">
                                        {course.discount}
                                    </span>
                                </div>
                                {course.isPopular && (
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 bg-[#f59e0b] text-white text-[10px] font-bold rounded-full">
                                            Popular
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex flex-col flex-grow">
                                {/* Level and Rating Row */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-gray-50 text-gray-600 text-[11px] font-medium rounded-full border border-gray-100">
                                        {course.level}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                        <span className="text-xs font-bold text-gray-900">{course.rating}</span>
                                        <span className="text-[11px] text-gray-400">({course.ratingCount})</span>
                                    </div>
                                </div>

                                <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#017CBA] transition-colors line-clamp-2">
                                    {course.name}
                                </h3>

                                <p className="text-sm text-gray-500 mb-4">
                                    {course.teacher}
                                </p>

                                {/* Info Row (Duration & Lessons) */}
                                <div className="flex items-center gap-4 text-gray-400 mb-6 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-[11px]">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4" />
                                        <span className="text-[11px]">{course.lessons}</span>
                                    </div>
                                </div>

                                {/* Price and Action Row */}
                                <div className="mt-auto">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl font-bold text-gray-900">
                                            ₹{course.price.sale.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-400 line-through">
                                            ₹{course.price.original.toLocaleString()}
                                        </span>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
                                        className="px-6 py-2 bg-[#017CBA] hover:bg-[#006699] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12 md:mt-20">

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => navigate('/courses')}
                            className="group flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            View All Courses
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default HomeCourse;
