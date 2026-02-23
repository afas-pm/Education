import React from "react";
import {
    MonitorPlay,
    MessageCircleQuestion,
    CalendarClock,
    ClipboardCheck,
    BarChart3,
    Globe,
    BadgeCheck,
    Headphones,
} from "lucide-react";

const features = [
    {
        icon: MonitorPlay,
        color: "bg-blue-100 text-blue-600",
        title: "Live Interactive Classes",
        desc: "Real-time classes with live chat, polls, and interactive sessions with expert teachers.",
    },
    {
        icon: MessageCircleQuestion,
        color: "bg-green-100 text-green-600",
        title: "Doubt Clearing",
        desc: "24/7 doubt clearing through chat, video calls, and dedicated discussion forums.",
    },
    {
        icon: CalendarClock,
        color: "bg-purple-100 text-purple-600",
        title: "Flexible Scheduling",
        desc: "Choose your timing from 15+ daily time slots to fit around your routine.",
    },
    {
        icon: ClipboardCheck,
        color: "bg-orange-100 text-orange-600",
        title: "Test Series & Practice",
        desc: "Regular mock tests, instant results, and detailed performance analysis.",
    },
    {
        icon: BarChart3,
        color: "bg-pink-100 text-pink-600",
        title: "Progress Tracking",
        desc: "Detailed analytics of your performance with personalized improvement suggestions.",
    },
    {
        icon: Globe,
        color: "bg-teal-100 text-teal-600",
        title: "Multi-language Support",
        desc: "Learn in your preferred language with content available in Hindi and English.",
    },
    {
        icon: BadgeCheck,
        color: "bg-indigo-100 text-indigo-600",
        title: "Certified Instructors",
        desc: "Learn from experienced teachers with proven track records in their respective domains.",
    },
    {
        icon: Headphones,
        color: "bg-amber-100 text-amber-600",
        title: "24/7 Support",
        desc: "Round the clock support to help students succeed via a team of dedicated experts.",
    },
];

const WhyChoose = () => {
    return (
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Why Choose EduPlatform?
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
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
                                className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
                            >
                                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
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
