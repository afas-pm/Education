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
            className="relative w-full bg-[#017CBA] overflow-hidden mb-16 md:mb-24"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-[80px] min-h-[586px] flex flex-col justify-center">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-white mb-4 tracking-tight">
                        Trusted by Thousands of Students
                    </h2>
                    <p className="text-blue-100/80 max-w-2xl mx-auto text-base sm:text-lg font-medium">
                        Our numbers speak for the quality of education we provide
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="text-center group flex flex-col items-center">
                                <div className="w-14 h-14 mb-6 bg-[#ffffff1a] backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-500">
                                    <Icon className="w-7 h-7 text-white/90" strokeWidth={1.5} />
                                </div>
                                <div className="text-4xl sm:text-5xl md:text-[52px] font-bold text-white mb-2 tabular-nums tracking-tighter">
                                    {counts[idx].toLocaleString()}
                                    {stat.suffix}
                                </div>
                                <div className="text-white font-bold text-base sm:text-lg mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-blue-100/60 text-[13px] font-medium">
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
