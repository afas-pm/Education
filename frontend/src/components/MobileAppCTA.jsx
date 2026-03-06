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
            className="relative py-20 overflow-hidden"
            style={{ background: "linear-gradient(113.42deg, #017CBA 6.46%, #7928CA 46.65%, #DB0082 86.84%)" }}
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ── Left Content ── */}
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

                        {/* Rating — Code 2 icon style (plain star, no circle) */}
                        <div className="flex items-center gap-2 text-white/90 pt-2">
                            <Star className="w-5 h-5 text-yellow-400" strokeWidth={2.5} />
                            <span className="text-sm font-semibold">4.8/5 on App Store &amp; Play Store</span>
                        </div>

                        {/* App store buttons — Code 2 style */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl border border-white/10 hover:bg-zinc-900 transition-colors cursor-pointer">
                                <div className="bg-white/10 p-1.5 rounded-md">
                                    <Download className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-white/60 uppercase tracking-wide leading-none mb-1">
                                        Download on the
                                    </p>
                                    <p className="text-[15px] font-bold leading-tight">App Store</p>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl border border-white/10 hover:bg-zinc-900 transition-colors cursor-pointer">
                                <div className="bg-white/10 p-1.5 rounded-md">
                                    <Download className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-white/60 uppercase tracking-wide leading-none mb-1">
                                        Get it on
                                    </p>
                                    <p className="text-[15px] font-bold leading-tight">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* ── Right — Phone mockup ── */}
                    <div className="flex justify-center items-center relative">

                        {/* ★ Star badge — Code 2 icon style */}
                        <div className="absolute top-0 right-0 lg:right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transform translate-x-1/2 -translate-y-1/2 z-20">
                            <Star className="w-6 h-6 text-[#1e293b]" strokeWidth={1.5} />
                        </div>

                        {/* ↓ Download badge — Code 2 icon style */}
                        <div className="absolute bottom-10 left-0 lg:left-12 w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 z-20">
                            <Download className="w-5 h-5 text-black" strokeWidth={2.5} />
                        </div>

                        {/* Phone frame — Code 2 design (dark bezel) */}
                        <div className="relative w-64 sm:w-72 md:w-80">
                            <div
                                className="relative bg-[#0F172A] shadow-2xl border border-white/10 mx-auto"
                                style={{
                                    width: "280px",
                                    height: "440px",
                                    borderRadius: "32px",
                                    padding: "10px",
                                }}
                            >
                                {/* Inner screen */}
                                <div className="bg-white h-full overflow-hidden" style={{ borderRadius: "24px" }}>
                                    <div className="px-5 pt-5 pb-6 space-y-4 h-full">

                                        {/* Status bar */}
                                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold mb-2">
                                            <span>9:41</span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-4 h-1 bg-gray-200 rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                            </div>
                                        </div>

                                        {/* App header */}
                                        <div className="flex justify-between items-center mb-6">
                                            <p className="font-bold text-gray-900 text-lg">EduPlatform</p>
                                            <TabletSmartphone className="w-5 h-5 text-blue-600" />
                                        </div>

                                        {/* Cards */}
                                        <div className="space-y-3">
                                            <div className="bg-[#f0fdf4] border border-green-50 rounded-2xl p-4">
                                                <p className="text-blue-600 font-bold text-[13px]">Live Class Starting</p>
                                                <p className="text-[11px] text-gray-500 mt-1">Mathematics - 10:00 AM</p>
                                            </div>

                                            <div className="bg-white border border-gray-100 rounded-2xl p-4">
                                                <p className="font-bold text-gray-800 text-[13px]">Today's Practice</p>
                                                <p className="text-[11px] text-gray-500 mt-1">5 questions remaining</p>
                                            </div>

                                            <div className="bg-[#f0fdf4] border border-green-50 rounded-2xl p-4">
                                                <p className="text-emerald-600 font-bold text-[13px]">Test Results</p>
                                                <p className="text-[11px] text-gray-500 mt-1">Score: 85/100</p>
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