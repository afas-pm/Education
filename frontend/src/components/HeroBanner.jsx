import React, { useState } from "react";
import bannerimg from "../assets/BannerImage2.png";
import bannerVideo from "../assets/BannerVideo.mp4";
import { useNavigate } from "react-router-dom";
import { Play, X } from "lucide-react";

const HeroBanner = () => {
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <section
                className="relative min-h-[520px] md:min-h-[560px] lg:min-h-[600px] flex items-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, #ae1b75 0%, #762391 35%, #2856c4 70%, #0c829e 100%)" }}
            >
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-500/8 rounded-full blur-2xl" />

                <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6 text-white">
                            {/* Live badge */}
                            <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-white/80">Live Classes Available</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-tight tracking-tight">
                                Master Your{" "}
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                                        Academic Goals
                                    </span>
                                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                                </span>
                                <br />
                                with Expert Guidance
                            </h1>

                            <p className="text-base sm:text-lg text-blue-100/60 max-w-lg leading-relaxed">
                                From school tuition to competitive exam preparation, get
                                personalized online coaching that adapts to your learning
                                style and schedule.
                            </p>

                            {/* Stat badges */}
                            <div className="flex flex-wrap gap-3 text-sm">
                                <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                    <span className="text-yellow-400">★</span>
                                    <span className="text-white/80">4.8 Rating</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                    <span className="text-white/90">10,000+</span>
                                    <span className="text-white/50">Students</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                    <span className="text-white/90">500+</span>
                                    <span className="text-white/50">Courses</span>
                                </div>
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <button
                                    onClick={() => navigate("/courses")}
                                    className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Explore Courses
                                </button>
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="px-7 py-3 bg-white/8 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4 fill-white" />
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* Right — Student Image */}
                        <div className="relative flex justify-center md:justify-end">
                            {/* Percentage badge */}
                            <div className="absolute bottom-6 right-2 md:right-8 z-20 bg-white rounded-2xl shadow-2xl p-3 sm:p-4 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                    98%
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-500 font-medium">Success Rate</div>
                            </div>

                            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl" />
                                <img
                                    src={bannerimg}
                                    alt="Student learning"
                                    className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                                />
                            </div>
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
