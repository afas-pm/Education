import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Search,
    BookOpen,
    Clock,
    Star,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    X,
    User
} from "lucide-react";
import { dummyCourses } from "../assets/dummyCourses";
import {
    coursePageStyles,
    coursePageCustomStyles,
} from "../assets/dummyStyles";

const INITIAL_COUNT = 8;

const Courses = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);

    // Rating state
    const [userRatings, setUserRatings] = useState(() => {
        try {
            const raw = localStorage.getItem("userCourseRatings");
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });

    const handleRate = (e, courseId, rating) => {
        e.stopPropagation();
        const updated = { ...userRatings, [courseId]: rating };
        setUserRatings(updated);
        localStorage.setItem("userCourseRatings", JSON.stringify(updated));
    };

    // Filter
    const filtered = dummyCourses.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

    return (
        <div className="bg-white">
            <Navbar />
            <style>{coursePageCustomStyles}</style>

            <div className={coursePageStyles.pageContainer}>
                {/* Header */}
                <div className={coursePageStyles.headerContainer}>
                    <div className={coursePageStyles.headerTransform}>
                        <h1 className={coursePageStyles.headerTitle}>Our Courses</h1>
                    </div>
                    <p className={coursePageStyles.headerSubtitle}>
                        Explore our curated collection of expert-led courses
                    </p>
                </div>

                {/* Search */}
                <div className={coursePageStyles.searchContainer}>
                    <div className={coursePageStyles.searchGradient}></div>
                    <div className={coursePageStyles.searchInputContainer}>
                        <div className={coursePageStyles.searchIconContainer}>
                            <Search className={coursePageStyles.searchIcon} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by course name or category..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShowAll(false);
                            }}
                            className={coursePageStyles.searchInput}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className={coursePageStyles.clearButton}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                {search && (
                    <div className="text-center mb-10">
                        <span className={coursePageStyles.resultsCount}>
                            {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
                        </span>
                    </div>
                )}

                {/* No Courses */}
                {filtered.length === 0 && (
                    <div className={coursePageStyles.noCoursesContainer}>
                        <BookOpen className={coursePageStyles.noCoursesIcon} />
                        <h3 className={coursePageStyles.noCoursesTitle}>
                            No courses found matching "{search}"
                        </h3>
                        <button
                            onClick={() => setSearch("")}
                            className={coursePageStyles.noCoursesButton}
                        >
                            Explore All Courses
                        </button>
                    </div>
                )}

                {/* Course Grid */}
                <div className={coursePageStyles.coursesGrid}>
                    <div className={coursePageStyles.coursesGridContainer}>
                        {visible.map((course) => {
                            const isFree = !!course.isFree || !course.price;
                            const rating = userRatings[course.id] || course.rating;

                            return (
                                <div
                                    key={course.id}
                                    className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2 flex flex-col h-full"
                                    onClick={() => navigate(`/courses/${course.id}`)}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-48 sm:h-52 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Category Tag */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[#017CBA] text-[10px] font-black rounded-lg shadow-sm uppercase tracking-wider">
                                                {course.category}
                                            </span>
                                        </div>
                                        {/* Discount Badge */}
                                        {course.discount && (
                                            <div className="absolute bottom-4 left-4">
                                                <span className="px-2.5 py-1 bg-[#017CBA] text-white text-[10px] font-black rounded-md shadow-lg uppercase tracking-tighter">
                                                    {course.discount}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* Level and Rating */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md border border-slate-100">
                                                {course.level}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                                <span className="text-[13px] font-black text-slate-800">{rating}</span>
                                                <span className="text-[11px] text-slate-400 font-medium">({course.ratingCount || "1.2k"})</span>
                                            </div>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#017CBA] transition-colors line-clamp-2">
                                            {course.name}
                                        </h3>

                                        <div className="flex items-center gap-2 mb-6">
                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-xs font-semibold text-slate-500">
                                                {course.teacher}
                                            </span>
                                        </div>

                                        {/* Stats Bar */}
                                        <div className="flex items-center justify-between text-slate-500 mb-6 pt-3 border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-bold">{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-bold">{course.lessons}</span>
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-black text-slate-900">
                                                    ₹{course.price.sale.toLocaleString()}
                                                </span>
                                                <span className="text-[11px] text-slate-400 line-through font-bold">
                                                    ₹{course.price.original.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#017CBA] group-hover:text-white transition-all duration-300">
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Show More Button */}
                    {filtered.length > INITIAL_COUNT && (
                        <div className={coursePageStyles.showMoreContainer}>
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className={coursePageStyles.showMoreButton}
                            >
                                {showAll ? (
                                    <ChevronUp className="w-5 h-5" />
                                ) : (
                                    <ChevronDown className="w-5 h-5" />
                                )}
                                <span>
                                    {showAll ? "Show Less" : `Show All (${filtered.length} courses)`}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Courses;
