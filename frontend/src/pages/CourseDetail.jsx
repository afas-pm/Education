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
import { dummyCourses } from "../assets/dummyCourses";
import { toast } from "react-toastify";

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [expandedLecture, setExpandedLecture] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [completedChapters, setCompletedChapters] = useState([]);
    const [visible, setVisible] = useState(false);

    // Default structure for fallback
    const defaultLectures = [
        {
            id: "default-lec-1",
            title: "Introduction",
            durationMin: 30,
            chapters: [
                { id: "default-ch-1", name: "Welcome to the Course", topic: "Overview", durationMin: 10, videoUrl: "dQw4w9WgXcQ" },
                { id: "default-ch-2", name: "Setting Goals", topic: "Preparation", durationMin: 20, videoUrl: "dQw4w9WgXcQ" }
            ]
        }
    ];

    useEffect(() => {
        const loadCourseData = () => {
            setLoading(true);
            try {
                // Find course in dummy data
                const foundCourse = dummyCourses.find(c => c.id === id);

                if (foundCourse) {
                    // Ensure it has lectures for the UI to work correctly
                    const enrichedCourse = {
                        ...foundCourse,
                        lectures: foundCourse.lectures || defaultLectures,
                        overview: foundCourse.overview || foundCourse.description || "Detailed overview coming soon..."
                    };
                    setCourse(enrichedCourse);

                    // Load enrollment and progress from localStorage
                    const localEnrollment = localStorage.getItem(`enrolled_${id}`);
                    setIsEnrolled(!!localEnrollment);

                    const localProgress = localStorage.getItem(`progress_${id}`);
                    if (localProgress) {
                        setCompletedChapters(JSON.parse(localProgress));
                    }
                }
            } catch (error) {
                console.error("Error loading course detail:", error);
                toast.error("Failed to load course details");
            } finally {
                setLoading(false);
            }
        };

        loadCourseData();
        window.scrollTo(0, 0);
        setTimeout(() => setVisible(true), 100);
    }, [id]);

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

    const handlePayment = () => {
        setEnrolling(true);
        // Mock payment process
        setTimeout(() => {
            localStorage.setItem(`enrolled_${id}`, "true");
            setIsEnrolled(true);
            setEnrolling(false);
            toast.success("Payment Successful! You are now enrolled.");
        }, 1500);
    };

    const handleFreeEnroll = () => {
        setEnrolling(true);
        // Mock free enrollment
        setTimeout(() => {
            localStorage.setItem(`enrolled_${id}`, "true");
            setIsEnrolled(true);
            setEnrolling(false);
            toast.success("Enrolled Successfully!");
        }, 800);
    };

    const toggleCompletion = (chapterId) => {
        if (!isEnrolled) {
            toast.info("Enroll to track progress");
            return;
        }

        const isCurrentlyCompleted = completedChapters.includes(chapterId);
        let updated;
        if (isCurrentlyCompleted) {
            updated = completedChapters.filter(cid => cid !== chapterId);
        } else {
            updated = [...completedChapters, chapterId];
        }

        setCompletedChapters(updated);
        localStorage.setItem(`progress_${id}`, JSON.stringify(updated));
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex flex-col justify-center items-center py-48 bg-slate-50">
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

    const isFree = !!course.isFree || !course.price || course.price.sale === 0;
    const canAccess = isFree || isEnrolled;

    const totalChaptersCount = course.lectures.reduce(
        (sum, lec) => sum + (lec.chapters?.length || 0),
        0
    );

    const courseChaptersIds = course.lectures.flatMap(lec => lec.chapters.map(ch => ch.id));
    const completedCount = completedChapters.filter(cid => courseChaptersIds.includes(cid)).length;
    const progressPerc = totalChaptersCount > 0 ? Math.round((completedCount / totalChaptersCount) * 100) : 0;

    const totalDuration = course.lectures.reduce(
        (sum, lec) => sum + (lec.durationMin || 0),
        0
    );

    const getVideoEmbedUrl = (url) => {
        if (!url) return null;
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const ytMatch = url.match(
                /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/
            );
            return ytMatch ? `https://www.youtube.com/embed/${ytMatch[1]}` : url;
        }
        // If it's just the ID
        if (url.length === 11) return `https://www.youtube.com/embed/${url}`;
        return url;
    };

    return (
        <div>
            <Navbar />
            <style>{courseDetailCustomStyles}</style>

            <div className={s.pageContainer}>
                <div
                    className={`${s.mainContainer} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        } transition-all duration-700`}
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

                            {course.learningOutcomes && (
                                <div className="mt-8">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">What you'll learn:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {course.learningOutcomes.map((outcome, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-600 text-sm leading-relaxed">{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                        {/* Video Player Section */}
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
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={s.videoTitle}>{selectedChapter.name}</h3>
                                            {isEnrolled && (
                                                <button
                                                    onClick={() => toggleCompletion(selectedChapter.id)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${completedChapters.includes(selectedChapter.id)
                                                            ? "bg-green-100 text-green-700 border border-green-200"
                                                            : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {completedChapters.includes(selectedChapter.id) ? (
                                                        <>
                                                            <CheckCircle className="w-4 h-4" />
                                                            Completed
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Circle className="w-4 h-4" />
                                                            Mark Complete
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                        <p className={s.videoDescription}>
                                            {selectedChapter.topic}
                                        </p>
                                        <div className={s.videoMeta}>
                                            <div className={s.durationBadge}>
                                                <Clock className={s.durationIcon} />
                                                <span>{selectedChapter.durationMin} min</span>
                                            </div>
                                        </div>
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
                                                ₹{(course.price?.sale || 0).toLocaleString()}
                                            </span>
                                            {course.price?.original && (
                                                <span className="text-lg text-gray-400 line-through font-medium ml-2">
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
