import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, User, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Expert: 'bg-purple-100 text-purple-700',
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular Courses
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
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
            {courses.map((course) => {
              const level = levelMap[course.id] || 'Beginner';
              const isFree = !!course.isFree || !course.price;
              const totalLectures = course.lectures?.reduce(
                (sum, lec) => sum + (lec.chapters?.length || 0), 0
              ) || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Level badge */}
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${levelColors[level]}`}>
                      {level}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({totalLectures} lectures)</span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                      {course.name}
                    </h3>

                    {/* Teacher */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                      <User className="w-3.5 h-3.5" />
                      <span>{course.teacher}</span>
                    </div>

                    {/* Price + Enroll */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isFree ? (
                          <span className="text-lg font-bold text-green-600">Free</span>
                        ) : (
                          <>
                            <span className="text-lg font-bold text-gray-900">
                              ₹{((course.price?.sale || 0) * 83).toLocaleString()}
                            </span>
                            {course.price?.original && (
                              <span className="text-sm text-gray-400 line-through">
                                ₹{((course.price.original || 0) * 83).toLocaleString()}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
                      className="mt-3 w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All link */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer text-sm"
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
