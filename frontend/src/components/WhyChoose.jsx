import React from "react";
import {
    Video,
    MessageCircle,
    Calendar,
    FileText,
    TrendingUp,
    Globe,
    Shield,
    Headphones,
} from "lucide-react";

const features = [
    {
        icon: Video,
        title: "Live Interactive Classes",
        desc: "Attend live classes with real-time interaction, whiteboard sharing, and instant doubt resolution.",
    },
    {
        icon: MessageCircle,
        title: "Doubt Clearing",
        desc: "24/7 doubt clearing through chat, voice calls, or dedicated doubt clearing sessions.",
    },
    {
        icon: Calendar,
        title: "Flexible Scheduling",
        desc: "Choose class timings that fit your schedule with recorded sessions for missed classes.",
    },
    {
        icon: FileText,
        title: "Test Series & Practice",
        desc: "Regular mock tests, chapter-wise quizzes, and previous year question papers.",
    },
    {
        icon: TrendingUp,
        title: "Progress Tracking",
        desc: "Detailed analytics of your performance with personalized improvement suggestions.",
    },
    {
        icon: Globe,
        title: "Multi-language Support",
        desc: "Learn in your preferred language with content available in Hindi, English, and regional languages.",
    },
    {
        icon: Shield,
        title: "Certified Instructors",
        desc: "Learn from experienced teachers with proven track records in their respective subjects.",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        desc: "Round-the-clock technical and academic support to ensure smooth learning experience.",
    },
];

const WhyChoose = () => {
    return (
        <section className="py-16 md:py-20 bg-[#f4f7fb]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Why Choose EduPlatform?
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Experience the perfect blend of technology and personalized learning designed
                        for your success
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {features.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={f.title}
                                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group text-center"
                            >
                                <div className="w-14 h-14 mx-auto mb-5 bg-[#E9F8FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-[#017CBA]" strokeWidth={1.6} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
