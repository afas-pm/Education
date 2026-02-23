import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, User, Clock, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Local high-quality assets for design alignment
import MathImg from "../assets/Complete Mathematics for JEE Main & Advanced.png";
import PhysicsImg from "../assets/CBSE Class 12 Physics Complete Course.png";
import UPSCImg from "../assets/UPSC Prelims & Mains Strategy 2024.png";
import SSCImg from "../assets/SSC CGL Complete Preparation.png";

const localCourseAssets = [
  {
    image: MathImg,
    ratingCount: "12,500",
    duration: "6 months",
    lessons: "180 lessons"
  },
  {
    image: PhysicsImg,
    ratingCount: "8,900",
    duration: "4 months",
    lessons: "120 lessons"
  },
  {
    image: UPSCImg,
    ratingCount: "15,600",
    duration: "12 months",
    lessons: "300 lessons"
  },
  {
    image: SSCImg,
    ratingCount: "6,700",
    duration: "5 months",
    lessons: "150 lessons"
  }
];

const HomeCourse = () => {
  const navigate = useNavigate();
  const { backendUrl } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/course/list`);
        const data = await response.json();
        if (data.success) {
          // Show first 4 courses for Figma layout
          setCourses(data.courses.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [backendUrl]);

  const levelMap = {
    9: 'Beginner', 10: 'Beginner', 11: 'Intermediate', 12: 'Intermediate',
    13: 'Expert', 14: 'Intermediate', 15: 'Expert', 16: 'Intermediate',
    17: 'Intermediate', 18: 'Beginner', 19: 'Expert', 20: 'Expert',
  };

  const levelColors = {
    Advanced: 'bg-white text-gray-800 border border-gray-200',
    Intermediate: 'bg-white text-gray-800 border border-gray-200',
    Expert: 'bg-white text-gray-800 border border-gray-200',
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">
            Popular Courses
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Join thousands of students already learning with our top-rated courses
          </p>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => {
              const localData = localCourseAssets[index];
              const displayImage = localData ? localData.image : course.image;
              const displayRatingCount = localData ? localData.ratingCount : "1,200";
              const displayDuration = localData ? localData.duration : "3 months";
              const displayLessons = localData ? localData.lessons : "100 lessons";

              const level = levelMap[course.id] || 'Beginner';
              const isFree = !!course.isFree || !course.price;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={displayImage}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Discount badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg tracking-wider">
                      44% OFF
                    </span>
                    {/* Popular badge */}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-gray-800 text-[10px] font-bold rounded-lg tracking-wider">
                      Popular
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Difficulty and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-4 py-1.5 rounded-xl text-[11px] font-bold border border-gray-100 bg-gray-50/50`}>
                        {level}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-800">{course.rating}</span>
                        <span className="text-[10px] text-gray-400 font-medium">({displayRatingCount})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {course.name}
                    </h3>

                    {/* Teacher */}
                    <p className="text-sm text-gray-500 mb-5 font-medium">
                      {course.teacher}
                    </p>

                    {/* Stats Icons */}
                    <div className="flex items-center gap-6 text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">{displayDuration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-xs font-medium">{displayLessons}</span>
                      </div>
                    </div>

                    {/* Price + Enroll */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-gray-900">
                            ₹{(course.price?.sale || 0).toLocaleString()}
                          </span>
                          {course.price?.original && (
                            <span className="text-xs text-gray-400 line-through font-medium">
                              ₹{(course.price.original || 0).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
                        className="px-6 py-2.5 bg-[#017CBA] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All link */}
        <div className="text-center mt-20">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-12 py-3.5 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-50 transition-all duration-300 cursor-pointer text-sm"
          >
            View All Courses
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeCourse;
