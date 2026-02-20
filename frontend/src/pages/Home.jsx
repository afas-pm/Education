import React from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import LearningPrograms from "../components/LearningPrograms";
import HomeCourse from "../components/HomeCourse";
import StatsSection from "../components/StatsSection";
import WhyChoose from "../components/WhyChoose";
import Testimonials from "../components/Testimonials";
import MobileAppCTA from "../components/MobileAppCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <LearningPrograms />
      <HomeCourse />
      <StatsSection />
      <WhyChoose />
      <Testimonials />
      <MobileAppCTA />
      <Footer />
    </div>
  );
};

export default Home;
