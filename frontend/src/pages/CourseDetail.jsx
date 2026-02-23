import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    courseDetailStylesH as s,
    courseDetailCustomStyles,
} from "../assets/dummyStyles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    ArrowLeft,
    Sparkles,
    BookOpen,
    Clock,
    User,
    ChevronDown,
    Play,
    CheckCircle,
    Circle,
    Tag,
    BarChart3,
    Unlock,
    Loader2,
    Lock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { backendUrl, token, user: currentUser } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [expandedLecture, setExpandedLecture] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [completedChapters, setCompletedChapters] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchCourseAndStatus = async () => {
            try {
                setLoading(true);
                // Fetch Course Details
                const courseRes = await fetch(`${backendUrl}/api/course/${id}`);
                const courseData = await courseRes.json();

                if (courseData.success) {
                    setCourse(courseData.course);

                    // If logged in, fetch enrollment and progress
                    if (token) {
                        const userRes = await fetch(`${backendUrl}/api/user/my-courses`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const userData = await userRes.json();
                        if (userData.success) {
                            const enrolled = userData.courses.some(c => c._id === courseData.course._id || c.id === courseData.course.id);
                            setIsEnrolled(enrolled);
                            setCompletedChapters(userData.completedChapters || []);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching course detail:", error);
                toast.error("Failed to load course details");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndStatus();
        window.scrollTo(0, 0);
        setTimeout(() => setVisible(true), 100);
    }, [id, backendUrl, token]);

    // Auto-select first chapter once course loads
    useEffect(() => {
        if (course && course.lectures?.length > 0) {
            const firstLecture = course.lectures[0];
            setExpandedLecture(firstLecture.id);
            if (firstLecture.chapters?.length > 0) {
                setSelectedChapter(firstLecture.chapters[0]);
            }
        }
    }, [course]);

    const handlePayment = async () => {
        if (!token) {
            toast.info("Please login to enroll");
            navigate("/login");
            return;
        }

        try {
            setEnrolling(true);
            const { data } = await axios.post(`${backendUrl}/api/payment/checkout`, {
                courseId: course._id
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (data.success && data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                toast.error("Failed to initiate payment");
                setEnrolling(false);
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error(error.response?.data?.message || "Failed to initiate payment");
            setEnrolling(false);
        }
    };

    const handleFreeEnroll = async () => {
        if (!token) {
            toast.info("Please login to enroll");
            navigate("/login");
            return;
        }

        try {
            setEnrolling(true);
            const { data } = await axios.post(`${backendUrl}/api/user/enroll`, {
                courseId: course._id
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (data.success) {
                toast.success("Enrolled Successfully!");
                setIsEnrolled(true);
            } else {
                toast.error(data.message || "Enrollment failed");
            }
        } catch (error) {
            console.error("Enrollment Error:", error);
            toast.error(error.response?.data?.message || "Enrollment failed");
        } finally {
            setEnrolling(false);
        }
    };

    const toggleCompletion = async (chapterId) => {
        if (!token || !isEnrolled) return;

        const isCurrentlyCompleted = completedChapters.includes(chapterId);

        try {
            const response = await fetch(`${backendUrl}/api/user/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ chapterId, completed: !isCurrentlyCompleted })
            });
            const data = await response.json();
            if (data.success) {
                setCompletedChapters(data.completedChapters);
            }
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex flex-col justify-center items-center py-48 bg-slate-950">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                    <p className="text-gray-400 font-medium">Loading Course Details...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div>
                <Navbar />
                <div className={s.notFoundContainer}>
                    <div className={s.notFoundContent}>
                        <h2 className={s.notFoundTitle}>Course Not Found</h2>
                        <p className={s.notFoundText}>
                            The course you're looking for doesn't exist.
                        </p>
                        <button
                            onClick={() => navigate("/courses")}
                            className={s.notFoundButton}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Courses
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const isFree = !!course.isFree || !course.price;
    const canAccess = isFree || isEnrolled;

    const totalChaptersCount = course.lectures.reduce(
        (sum, lec) => sum + (lec.chapters?.length || 0),
        0
    );

    const courseChaptersIds = course.lectures.flatMap(lec => lec.chapters.map(ch => ch.id));
    const completedCount = completedChapters.filter(id => courseChaptersIds.includes(id)).length;
    const progressPerc = totalChaptersCount > 0 ? Math.round((completedCount / totalChaptersCount) * 100) : 0;

    const totalDuration = course.lectures.reduce(
        (sum, lec) => sum + (lec.durationMin || 0),
        0
    );

    const getVideoEmbedUrl = (url) => {
        if (!url) return null;

        // Handle raw 11-character YouTube IDs
        if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
            return `https://www.youtube.com/embed/${url}`;
        }

        const ytMatch = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
        );
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

        // Return null or a safe fallback if not a valid URL/ID
        if (url.startsWith("http")) return url;
        return null;
    };

    return (
        <div>
            <Navbar />
            <style>{courseDetailCustomStyles}</style>

            <div className={s.pageContainer}>
                <div
                    className={`${s.mainContainer} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/courses")}
                        className={s.backButton}
                    >
                        <ArrowLeft className={s.backButtonIcon} />
                        <span className={s.backButtonText}>Back to Courses</span>
                    </button>

                    {/* Header */}
                    <div className={s.headerContainer}>
                        <div className={s.courseBadge}>
                            <Sparkles className={s.badgeIcon} />
                            <span className={s.badgeText}>
                                {isFree ? "Free Course" : isEnrolled ? "Enrolled" : "Premium Course"}
                            </span>
                        </div>
                        <h1 className={s.courseTitle}>{course.name}</h1>
                    </div>

                    {/* Overview */}
                    <div className={s.overviewContainer}>
                        <div className={s.overviewCard}>
                            <div className={s.overviewHeader}>
                                <BookOpen className={s.overviewIcon} />
                                <h3 className={s.overviewTitle}>Course Overview</h3>
                            </div>
                            <p className={s.overviewText}>{course.overview}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={s.statsContainer}>
                        <div className={s.statItem}>
                            <Clock className={s.statIcon} />
                            <span className={s.statText}>{totalDuration} min</span>
                        </div>
                        <div className={s.statItem}>
                            <BookOpen className={s.statIcon} />
                            <span className={s.statText}>
                                {course.lectures.length} modules
                            </span>
                        </div>
                        <div className={s.teacherStat}>
                            <User className={s.teacherIcon} />
                            <span className={s.teacherText}>{course.teacher}</span>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className={s.mainGrid}>
                        {/* Video PlayerSection */}
                        <div className={s.videoSection}>
                            <div className={s.videoContainer}>
                                <div className={s.videoWrapper}>
                                    {!canAccess ? (
                                        <div className={s.videoPlaceholder}>
                                            <div className={s.videoPlaceholderContent}>
                                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                                                    <Lock className="w-8 h-8 text-indigo-400" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">Content Locked</h3>
                                                <p className="text-gray-400 mb-6 max-w-xs text-center">
                                                    Enroll in this course to get full access to all video lectures and materials.
                                                </p>
                                                <button
                                                    onClick={isFree ? handleFreeEnroll : handlePayment}
                                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                                                >
                                                    {enrolling ? "Processing..." : "Enroll Now"}
                                                </button>
                                            </div>
                                        </div>
                                    ) : getVideoEmbedUrl(selectedChapter?.videoUrl) ? (
                                        <iframe
                                            src={getVideoEmbedUrl(selectedChapter.videoUrl)}
                                            className={s.videoFrame}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={selectedChapter.name}
                                        ></iframe>
                                    ) : (
                                        <div className={s.videoPlaceholder}>
                                            <div className={s.videoPlaceholderContent}>
                                                <div className={s.videoPlaceholderIcon}>
                                                    <Play className={s.videoPlaceholderPlayIcon} />
                                                </div>
                                                <p className={s.videoPlaceholderText}>
                                                    Select a chapter to start
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Video Info */}
                                {selectedChapter && (
                                    <div className={s.videoInfo}>
                                        <h3 className={s.videoTitle}>{selectedChapter.name}</h3>
                                        <p className={s.videoDescription}>
                                            {selectedChapter.topic}
                                        </p>
                                        <div className={s.videoMeta}>
                                            <div className={s.durationBadge}>
                                                <Clock className={s.durationIcon} />
                                                <span>{selectedChapter.durationMin} min</span>
                                            </div>
                                            <span className={s.chapterBadge}>
                                                Chapter {selectedChapter.id}
                                            </span>
                                        </div>

                                        {/* Completion Button */}
                                        {isEnrolled && (
                                            <div className={s.completionSection}>
                                                <button
                                                    onClick={() => toggleCompletion(selectedChapter.id)}
                                                    className={`${s.completionButton} ${completedChapters.includes(selectedChapter.id)
                                                        ? s.completionButtonCompleted
                                                        : s.completionButtonIncomplete
                                                        }`}
                                                >
                                                    {completedChapters.includes(selectedChapter.id) ? (
                                                        <CheckCircle className={s.completionIcon} />
                                                    ) : (
                                                        <Circle className={s.completionIcon} />
                                                    )}
                                                    {completedChapters.includes(selectedChapter.id)
                                                        ? "Completed"
                                                        : "Mark as Complete"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className={s.sidebar}>
                            {/* Course Content */}
                            <div className={s.sidebarCard}>
                                <div className={s.contentHeader}>
                                    <h3 className={s.contentTitle}>Course Content</h3>
                                    {isFree && (
                                        <div className={s.freeAccessBadge}>
                                            <Unlock className={s.freeAccessIcon} />
                                            Free Access
                                        </div>
                                    )}
                                </div>

                                <div className={s.contentList}>
                                    {course.lectures.map((lecture) => (
                                        <div key={lecture.id} className={s.lectureItem}>
                                            {/* Lecture Header */}
                                            <div
                                                onClick={() =>
                                                    setExpandedLecture(
                                                        expandedLecture === lecture.id
                                                            ? null
                                                            : lecture.id
                                                    )
                                                }
                                                className={`${s.lectureHeader} ${expandedLecture === lecture.id
                                                    ? s.lectureHeaderExpanded
                                                    : s.lectureHeaderNormal
                                                    }`}
                                            >
                                                <div className={s.lectureContent}>
                                                    <div className={s.lectureLeft}>
                                                        <ChevronDown
                                                            className={`${s.lectureChevron} ${expandedLecture === lecture.id
                                                                ? s.lectureChevronExpanded
                                                                : s.lectureChevronNormal
                                                                }`}
                                                            size={18}
                                                        />
                                                        <div className={s.lectureInfo}>
                                                            <h4 className={s.lectureTitle}>
                                                                {lecture.title}
                                                            </h4>
                                                            <div className={s.lectureMeta}>
                                                                <span className={s.lectureDuration}>
                                                                    <Clock
                                                                        className={s.lectureDurationIcon}
                                                                        size={14}
                                                                    />
                                                                    {lecture.durationMin} min
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chapters */}
                                            {expandedLecture === lecture.id &&
                                                lecture.chapters && (
                                                    <div className={s.chaptersList}>
                                                        {lecture.chapters.map((chapter) => {
                                                            const isSelected =
                                                                selectedChapter?.id === chapter.id;
                                                            const isCompleted = completedChapters.includes(chapter.id);
                                                            return (
                                                                <div
                                                                    key={chapter.id}
                                                                    onClick={() =>
                                                                        setSelectedChapter(chapter)
                                                                    }
                                                                    className={`${s.chapterItem} ${isSelected
                                                                        ? s.chapterItemSelected
                                                                        : s.chapterItemNormal
                                                                        }`}
                                                                >
                                                                    <div className={s.chapterContent}>
                                                                        <div className={s.chapterLeft}>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    toggleCompletion(chapter.id);
                                                                                }}
                                                                                disabled={!isEnrolled}
                                                                                className={`${s.chapterCompletionButton} ${isCompleted
                                                                                    ? s.chapterCompletionCompleted
                                                                                    : s.chapterCompletionNormal
                                                                                    }`}
                                                                            >
                                                                                {isCompleted ? (
                                                                                    <CheckCircle
                                                                                        className="w-5 h-5"
                                                                                    />
                                                                                ) : (
                                                                                    <Circle className="w-5 h-5" />
                                                                                )}
                                                                            </button>
                                                                            <div className={s.chapterInfo}>
                                                                                <p
                                                                                    className={`${s.chapterName} ${isSelected
                                                                                        ? s.chapterNameSelected
                                                                                        : s.chapterNameNormal
                                                                                        }`}
                                                                                >
                                                                                    {chapter.name}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <span className={s.chapterDuration}>
                                                                            {chapter.durationMin}m
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing Card */}
                            {!isEnrolled && (
                                <div className={s.sidebarCard}>
                                    <div className={s.pricingHeader}>
                                        <Tag className="w-5 h-5 text-indigo-600" />
                                        <h3 className={s.pricingTitle}>Pricing</h3>
                                    </div>
                                    {isFree ? (
                                        <div className={s.pricingAmount}>
                                            <span className={s.pricingCurrent}>Free</span>
                                        </div>
                                    ) : (
                                        <div className={s.pricingAmount}>
                                            <span className={s.pricingCurrent}>
                                                ₹{(course.price?.sale).toLocaleString()}
                                            </span>
                                            {course.price?.original && (
                                                <span className="text-lg text-gray-400 line-through font-medium">
                                                    ₹{(course.price.original).toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <p className={s.pricingDescription}>
                                        Full lifetime access to all course materials
                                    </p>
                                    <button
                                        onClick={isFree ? handleFreeEnroll : handlePayment}
                                        disabled={enrolling}
                                        className={isFree ? s.enrollButtonFree : s.enrollButton}
                                    >
                                        {enrolling ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : isFree ? (
                                            <>
                                                <Unlock className={s.enrollButtonIcon} />
                                                Get Free Access
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className={s.enrollButtonIcon} />
                                                Enroll Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Progress Card */}
                            {isEnrolled && (
                                <div className={s.sidebarCard}>
                                    <div className={s.progressHeader}>
                                        <BarChart3 className={s.progressIcon} />
                                        <h3 className={s.progressTitle}>Your Progress</h3>
                                    </div>
                                    <div className={s.progressSection}>
                                        <div className={s.progressBarContainer}>
                                            <div
                                                className={s.progressBar}
                                                style={{ width: `${progressPerc}%` }}
                                            ></div>
                                        </div>
                                        <div className={s.progressStats}>
                                            <div className={s.progressStat}>
                                                <div className={s.progressStatValue}>{progressPerc}%</div>
                                                <div className={s.progressStatLabel}>Completed</div>
                                            </div>
                                            <div className={s.progressStat}>
                                                <div className={s.progressStatValue}>
                                                    {completedCount}/{totalChaptersCount}
                                                </div>
                                                <div className={s.progressStatLabel}>Chapters</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CourseDetail;
