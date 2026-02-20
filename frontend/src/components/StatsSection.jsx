import React, { useState, useEffect, useRef } from "react";
import { Users, BookOpen, Award, Clock } from "lucide-react";

const stats = [
    { icon: Users, target: 50000, label: "Active Students", suffix: "+", sublabel: "Learning with us" },
    { icon: BookOpen, target: 500, label: "Courses Available", suffix: "+", sublabel: "Across all categories" },
    { icon: Award, target: 98, label: "Success Rate", suffix: "%", sublabel: "In competitive exams" },
    { icon: Clock, target: 10000, label: "Hours of Content", suffix: "+", sublabel: "High-quality videos" },
];

const StatsSection = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    stats.forEach((stat, idx) => {
                        const duration = 2000;
                        const step = stat.target / (duration / 16);
                        let current = 0;
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= stat.target) {
                                setCounts((prev) => {
                                    const next = [...prev];
                                    next[idx] = stat.target;
                                    return next;
                                });
                                clearInterval(timer);
                            } else {
                                setCounts((prev) => {
                                    const next = [...prev];
                                    next[idx] = Math.floor(current);
                                    return next;
                                });
                            }
                        }, 16);
                    });
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)" }}
        >
            {/* Decorative */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                        Trusted by Thousands of Students
                    </h2>
                    <p className="text-blue-200/70 max-w-xl mx-auto text-sm sm:text-base">
                        Our numbers speak for the quality of education we provide
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="text-center group">
                                <div className="w-14 h-14 mx-auto mb-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                                    <Icon className="w-6 h-6 text-cyan-300" />
                                </div>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 tabular-nums">
                                    {counts[idx].toLocaleString()}
                                    {stat.suffix}
                                </div>
                                <div className="text-white/90 font-medium text-sm sm:text-base mb-0.5">
                                    {stat.label}
                                </div>
                                <div className="text-blue-200/50 text-xs sm:text-sm">
                                    {stat.sublabel}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
