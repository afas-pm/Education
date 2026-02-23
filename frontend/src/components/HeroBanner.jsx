import React, { useState } from "react";
import bannerimg from "../assets/Container.png";
import bannerVideo from "../assets/BannerVideo.mp4";
import { useNavigate } from "react-router-dom";
import { Play, X, Star, Users, BookOpen } from "lucide-react";

const HeroBanner = () => {
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <section
                className="relative pt-16 min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center overflow-hidden"
                style={{ background: "linear-gradient(113.42deg, #DB0082 6.46%, #017CBA 66.65%)" }}
            >

                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-500/8 rounded-full blur-2xl" />

                <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6 text-white">

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-tight tracking-tight">
                                Master Your{" "}
                                <br />
                                <span className="text-[#00d1ff]">Academic Goals</span>
                                <br />
                                with Expert Guidance
                            </h1>

                            <p className="text-base sm:text-lg text-blue-100/60 max-w-lg leading-relaxed">
                                From school tuition to competitive exam preparation, get
                                personalized online coaching that adapts to your learning
                                style and schedule.
                            </p>

                            {/* Stat badges */}
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-white font-medium">4.9/5 Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-400" />
                                    <span className="text-white font-medium">50,000+ Students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-orange-400" />
                                    <span className="text-white font-medium">500+ Courses</span>
                                </div>
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={() => navigate("/courses")}
                                    className="px-8 py-3 bg-[#017CBA] hover:bg-[#016ba3] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Explore Courses
                                </button>
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="px-8 py-3 bg-white text-[#017CBA] border border-gray-200 font-semibold rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4 fill-[#017CBA] text-[#017CBA]" />
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* Right — Student Image */}
                        <div className="relative w-full max-w-[584px]">
                            <img
                                src={bannerimg}
                                alt="Student learning"
                                className="w-[584px] h-[389.52px] rounded-[16px] object-cover"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {showVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
                    onClick={() => setShowVideo(false)}
                >
                    <div
                        className="relative w-[92%] max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src={bannerVideo}
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                        />
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroBanner;
