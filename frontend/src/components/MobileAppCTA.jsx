import React from "react";
import { Smartphone, Download, Bell, BookOpenCheck, BarChart3 } from "lucide-react";

const appFeatures = [
    { icon: Download, text: "Offline video downloads" },
    { icon: Bell, text: "Push notifications for classes" },
    { icon: BookOpenCheck, text: "In-app practice tests" },
    { icon: BarChart3, text: "Progress tracking & analytics" },
];

const MobileAppCTA = () => {
    return (
        <section
            className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a1a4e 0%, #2d1b69 40%, #4c1d95 70%, #1e3a5f 100%)" }}
        >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-white space-y-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                            Take Your Learning<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                                Anywhere with Our App
                            </span>
                        </h2>
                        <p className="text-blue-100/70 text-sm sm:text-base max-w-md leading-relaxed">
                            Download the SkillForge mobile app and access all your
                            courses, live classes, and study materials on the go.
                        </p>

                        {/* Feature list */}
                        <ul className="space-y-3">
                            {appFeatures.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <li key={f.text} className="flex items-center gap-3 text-white/90 text-sm sm:text-base">
                                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-cyan-300" />
                                        </div>
                                        {f.text}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* App store buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                App Store
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.313-1.707L20.5 12l-2.689 1.5-2.566-2.5 2.567-2.5zM5.863 2.658l10.937 6.334-2.302 2.302-8.635-8.636z" />
                                </svg>
                                Google Play
                            </a>
                        </div>

                        <p className="text-white/40 text-xs">
                            Available on App Store & Play Store
                        </p>
                    </div>

                    {/* Right — Phone mockup */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-64 sm:w-72 md:w-80">
                            {/* Phone frame */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-purple-500/20 border border-gray-700">
                                <div className="bg-white rounded-[2rem] overflow-hidden">
                                    {/* Screen content */}
                                    <div className="p-4 space-y-3">
                                        {/* Status bar */}
                                        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                                            <span>9:41</span>
                                            <div className="flex gap-1">
                                                <span>📶</span><span>🔋</span>
                                            </div>
                                        </div>
                                        {/* App header */}
                                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 text-white">
                                            <p className="font-bold text-sm">SkillForge</p>
                                            <p className="text-[10px] text-white/70 mt-1">Your learning companion</p>
                                        </div>
                                        {/* Cards */}
                                        <div className="space-y-2">
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <BookOpenCheck className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-800">Live Class Starting</p>
                                                        <p className="text-[10px] text-gray-500">React Masterclass • 2:00 PM</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <p className="text-[11px] font-semibold text-gray-800 mb-1">Today's Practice</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-3/4"></div>
                                                </div>
                                                <p className="text-[10px] text-gray-500 mt-1">75% completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating dot */}
                            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-green-400 rounded-full shadow-lg shadow-green-400/40 animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileAppCTA;
