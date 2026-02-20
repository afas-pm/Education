import React, { useState, useEffect } from "react";
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
    Filter,
    ArrowUpDown,
    CheckCircle,
    LayoutGrid,
    List,
    Loader2,
    X,
    User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
    coursePageStyles,
    coursePageCustomStyles,
} from "../assets/dummyStyles";

const INITIAL_COUNT = 8;

const Courses = () => {
    const navigate = useNavigate();
    const { backendUrl } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
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
    const [hoverRatings, setHoverRatings] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/course/list`);
                const data = await response.json();
                if (data.success) {
                    setCourses(data.courses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [backendUrl]);

    const handleRate = (e, courseId, rating) => {
        e.stopPropagation();
        const updated = { ...userRatings, [courseId]: rating };
        setUserRatings(updated);
        localStorage.setItem("userCourseRatings", JSON.stringify(updated));
    };

    // Filter
    const filtered = courses.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

    return (
        <div>
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
                            placeholder="Search courses..."
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
                    <div className="text-center mb-6">
                        <span className={coursePageStyles.resultsCount}>
                            {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
                        </span>
                    </div>
                )}

                {/* No Courses */}
                {!loading && filtered.length === 0 && (
                    <div className={coursePageStyles.noCoursesContainer}>
                        <BookOpen className={coursePageStyles.noCoursesIcon} />
                        <h3 className={coursePageStyles.noCoursesTitle}>
                            No courses found
                        </h3>
                        <button
                            onClick={() => setSearch("")}
                            className={coursePageStyles.noCoursesButton}
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Course Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                    </div>
                ) : (
                    <div className={coursePageStyles.coursesGrid}>
                        <div className={coursePageStyles.coursesGridContainer}>
                            {visible.map((course) => {
                                const isFree = !!course.isFree || !course.price;
                                const displayRating = hoverRatings[course.id] || userRatings[course.id] || course.rating;

                                return (
                                    <div
                                        key={course.id}
                                        className={coursePageStyles.courseCard}
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                    >
                                        <div className={coursePageStyles.courseCardInner}>
                                            <div className={coursePageStyles.courseCardContent}>
                                                {/* Image */}
                                                <div className={coursePageStyles.courseImageContainer}>
                                                    <img
                                                        src={course.image}
                                                        alt={course.name}
                                                        className={coursePageStyles.courseImage}
                                                    />
                                                    <div className={coursePageStyles.courseImageOverlay}></div>
                                                    <div className={coursePageStyles.categoryBadge}>
                                                        {course.category}
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className={coursePageStyles.courseInfo}>
                                                    <h3 className={coursePageStyles.courseName}>
                                                        {course.name}
                                                    </h3>

                                                    <div className={coursePageStyles.teacherContainer}>
                                                        <User className={coursePageStyles.teacherIcon} />
                                                        <span className={coursePageStyles.teacherName}>
                                                            {course.teacher}
                                                        </span>
                                                    </div>

                                                    {/* Rating */}
                                                    <div className={coursePageStyles.ratingContainer}>
                                                        <div className={coursePageStyles.ratingStars}>
                                                            {Array.from({ length: 5 }).map((_, i) => {
                                                                const idx = i + 1;
                                                                const filled = idx <= displayRating;
                                                                return (
                                                                    <button
                                                                        key={i}
                                                                        className={coursePageStyles.ratingStarButton}
                                                                        onClick={(e) => handleRate(e, course.id, idx)}
                                                                        onMouseEnter={() => setHoverRatings(s => ({ ...s, [course.id]: idx }))}
                                                                        onMouseLeave={() => setHoverRatings(s => ({ ...s, [course.id]: 0 }))}
                                                                    >
                                                                        <Star
                                                                            size={16}
                                                                            fill={filled ? "currentColor" : "none"}
                                                                            className={filled ? "text-yellow-400" : "text-gray-300"}
                                                                        />
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Price */}
                                                    <div className={coursePageStyles.priceContainer}>
                                                        {isFree ? (
                                                            <span className={coursePageStyles.priceFree}>Free</span>
                                                        ) : (
                                                            <>
                                                                <span className={coursePageStyles.priceCurrent}>
                                                                    ₹{((course.price?.sale || 0) * 83).toLocaleString()}
                                                                </span>
                                                                {course.price?.original && (
                                                                    <span className={coursePageStyles.priceOriginal}>
                                                                        ₹{((course.price.original || 0) * 83).toLocaleString()}
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Toggle */}
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
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Courses;
