import React from "react";
import { Download, Star, TabletSmartphone } from "lucide-react";

const appFeatures = [
    { text: "Offline video downloads" },
    { text: "Push notifications for classes" },
    { text: "Interactive practice tests" },
    { text: "Progress tracking & analytics" },
];

const MobileAppCTA = () => {
    return (
        <section
            className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{ background: "linear-gradient(113.42deg, #017CBA 6.46%, #7928CA 46.65%, #DB0082 86.84%)" }}
        >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-white space-y-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Take Your Learning<br />
                            Anywhere with Our App
                        </h2>
                        <p className="text-blue-50/80 text-base sm:text-lg max-w-lg leading-relaxed">
                            Download the EduPlatform mobile app and access all your
                            courses, live classes, and study materials on the go.
                        </p>

                        {/* Feature list */}
                        <ul className="space-y-4">
                            {appFeatures.map((f) => (
                                <li key={f.text} className="flex items-center gap-3 text-white text-base">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                                    {f.text}
                                </li>
                            ))}
                        </ul>

                        {/* Rating block */}
                        <div className="flex items-center gap-2 text-white/90 pt-2">
                            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Star className="w-3.5 h-3.5 text-white fill-current" />
                            </div>
                            <span className="text-sm font-medium">4.8/5 on App Store & Play Store</span>
                        </div>

                        {/* App store buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="bg-black text-white px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2 hover:bg-gray-900 transition-all">
                                <div className="bg-white/10 p-1.5 rounded-md">
                                    <Download className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase leading-none opacity-70">Download on the</p>
                                    <p className="text-sm font-bold leading-tight">App Store</p>
                                </div>
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2 hover:bg-gray-900 transition-all">
                                <div className="bg-white/10 p-1.5 rounded-md">
                                    <Download className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase leading-none opacity-70">Get it on</p>
                                    <p className="text-sm font-bold leading-tight">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right — Phone mockup */}
                    <div className="flex justify-center items-center relative">
                        {/* Star floating icon */}
                        <div className="absolute top-0 right-0 lg:right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transform translate-x-1/2 -translate-y-1/2 z-20">
                            <Star className="w-6 h-6 text-white fill-current" />
                        </div>

                        {/* Download floating icon */}
                        <div className="absolute bottom-10 left-0 lg:left-12 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 z-20">
                            <Download className="w-6 h-6 text-white" />
                        </div>

                        <div className="relative w-64 sm:w-72 md:w-80">
                            {/* Phone frame */}
                            <div className="bg-white rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900">
                                <div className="bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-200">
                                    <div className="p-4 py-6 space-y-4">
                                        <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mb-4">
                                            <span>9:41</span>
                                            <div className="flex gap-1.5 mt-[-2px]">
                                                <div className="w-1 h-3 bg-gray-300 rounded-full" />
                                                <div className="w-1.5 h-3 bg-gray-300 rounded-full" />
                                                <div className="w-2.5 h-3 bg-gray-400 rounded-full" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mb-6">
                                            <p className="font-bold text-gray-800 text-lg">EduPlatform</p>
                                            <TabletSmartphone className="w-5 h-5 text-blue-600" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                                <p className="text-blue-700 font-bold text-[13px]">Live Class Starting</p>
                                                <p className="text-[11px] text-gray-600 font-medium">Mathematics - 10:00 AM</p>
                                            </div>

                                            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                                <p className="text-gray-800 font-bold text-[13px]">Today's Practice</p>
                                                <p className="text-[11px] text-gray-600">5 questions remaining</p>
                                            </div>

                                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                                <p className="text-emerald-700 font-bold text-[13px]">Test Results</p>
                                                <p className="text-[11px] text-gray-600">Score: 85/100</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileAppCTA;