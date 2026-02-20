import React, { useState } from "react";
import { facultyStyles } from "../assets/dummyStyles";
import sampleTeachers from "../assets/dummyFaculty";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Star,
    Mail,
    Linkedin,
    Instagram,
} from "lucide-react";

const Faculty = () => {
    const [ratings, setRatings] = useState(() => {
        const initial = {};
        sampleTeachers.forEach((t) => {
            initial[t.id] = t.initialRating || 0;
        });
        return initial;
    });
    const [hoverRatings, setHoverRatings] = useState({});

    const handleRate = (teacherId, rating) => {
        setRatings((prev) => ({ ...prev, [teacherId]: rating }));
    };

    return (
        <div className={facultyStyles.container}>
            <style>{facultyStyles.animations}</style>
            <Navbar />

            {/* Header */}
            <header className={facultyStyles.header}>
                <div className={facultyStyles.headerContent}>
                    <h1 className={facultyStyles.title}>Our Faculty</h1>
                    <div className={facultyStyles.titleDivider}></div>
                    <p className={facultyStyles.subtitle}>
                        Learn from industry experts with years of real-world experience
                    </p>
                </div>
            </header>

            {/* Faculty Grid */}
            <section className={facultyStyles.facultySection}>
                <div className={facultyStyles.facultyContainer}>
                    <div className={facultyStyles.facultyGrid}>
                        {sampleTeachers.map((teacher) => {
                            const userRating = ratings[teacher.id] || 0;
                            const hover = hoverRatings[teacher.id] || 0;
                            const displayRating = hover || userRating;

                            return (
                                <div key={teacher.id} className={facultyStyles.card}>
                                    <div className={facultyStyles.teacherCard}>
                                        {/* Image */}
                                        <div className={facultyStyles.imageContainer}>
                                            <div className={facultyStyles.imageWrapper}>
                                                <img
                                                    src={teacher.image}
                                                    alt={teacher.name}
                                                    className={facultyStyles.image}
                                                    loading="lazy"
                                                />
                                            </div>
                                            {/* Experience Badge */}
                                            <div className={facultyStyles.experienceBadge}>
                                                <span className={facultyStyles.experienceBadgeContent}>
                                                    {teacher.experience}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className={facultyStyles.teacherInfo}>
                                            <h3 className={facultyStyles.teacherName}>
                                                {teacher.name}
                                            </h3>
                                            <p className={facultyStyles.teacherQualification}>
                                                {teacher.qualification}
                                            </p>
                                            <p className={facultyStyles.teacherBio}>{teacher.bio}</p>
                                        </div>

                                        {/* Rating */}
                                        <div className={facultyStyles.ratingContainer}>
                                            <div className={facultyStyles.starRating}>
                                                <div className={facultyStyles.starsContainer}>
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        const idx = i + 1;
                                                        const filled = idx <= Math.round(displayRating);
                                                        return (
                                                            <button
                                                                key={i}
                                                                className={`${facultyStyles.starButton} ${filled
                                                                        ? facultyStyles.starButtonActive
                                                                        : facultyStyles.starButtonInactive
                                                                    }`}
                                                                onClick={() => handleRate(teacher.id, idx)}
                                                                onMouseEnter={() =>
                                                                    setHoverRatings((s) => ({
                                                                        ...s,
                                                                        [teacher.id]: idx,
                                                                    }))
                                                                }
                                                                onMouseLeave={() =>
                                                                    setHoverRatings((s) => ({
                                                                        ...s,
                                                                        [teacher.id]: 0,
                                                                    }))
                                                                }
                                                                style={{ background: "transparent" }}
                                                            >
                                                                <Star
                                                                    className={facultyStyles.starIcon}
                                                                    fill={filled ? "currentColor" : "none"}
                                                                    stroke="currentColor"
                                                                />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className={facultyStyles.socialContainer}>
                                            {teacher.email && (
                                                <a
                                                    href={`mailto:${teacher.email}`}
                                                    className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconEmail}`}
                                                    aria-label="Email"
                                                >
                                                    <Mail className={facultyStyles.socialIconSvg} />
                                                </a>
                                            )}
                                            {teacher.linkedin && (
                                                <a
                                                    href={teacher.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconLinkedin}`}
                                                    aria-label="LinkedIn"
                                                >
                                                    <Linkedin className={facultyStyles.socialIconSvg} />
                                                </a>
                                            )}
                                            {teacher.instagram && (
                                                <a
                                                    href={teacher.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconInstagram}`}
                                                    aria-label="Instagram"
                                                >
                                                    <Instagram className={facultyStyles.socialIconSvg} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Faculty;
