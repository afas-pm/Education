import React, { useState } from "react";
import { bannerStyles, customStyles } from "../assets/dummyStyles";
import { features, floatingIcons } from "../assets/dummyBanner";
import { CircleCheckBig, Sparkles, X } from "lucide-react";
import bannerimg from "../assets/Bannerimage.jpg";
import video from "../assets/BannerVideo.mp4";

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={bannerStyles.container}>
      
      {/* Floating Icons */}
      <div className={bannerStyles.floatingIconsWrapper}>
        {floatingIcons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt || ""}
            className={`${bannerStyles.floatingIcon} ${icon.pos}`}
            style={{
              animationDelay: `${index * 0.35}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      <div className={bannerStyles.mainContent}>
        <div className={bannerStyles.grid}>
          
          {/* LEFT */}
          <div className={bannerStyles.leftContent}>
            <span className={bannerStyles.badge}>
              <Sparkles className={bannerStyles.badgeIcon} />
              New Features Available
            </span>

            <h1 className={bannerStyles.heading}>
              <span className={bannerStyles.headingSpan1}>
                Build Amazing
              </span>
              <span className={bannerStyles.headingSpan2}>
                Digital Product
              </span>
            </h1>

            <p className={bannerStyles.description}>
              Create stunning websites and applications with our intuitive platform.
            </p>

            {/* Features */}
            <div className={bannerStyles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={feature.text} className={bannerStyles.featureItem}>
                  <div className={bannerStyles.featureIconContainer}>
                    <span className={`${bannerStyles.featureIcon} ${feature.color}`}>
                      <CircleCheckBig size={16} />
                    </span>
                  </div>
                  <span className={bannerStyles.featureText}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className={bannerStyles.buttonsContainer}>
              <a
                href="/courses"
                className={customStyles.buttonGetStarted}
              >
                Get Started
              </a>

              <button
                className={customStyles.buttonSecondary}
                onClick={() => setShowVideo(true)}
              >
                View Demo
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className={bannerStyles.imageContainer}>
            <img
              src={bannerimg}
              alt="Banner"
              className={bannerStyles.bannerImage}
            />
          </div>

        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className={bannerStyles.videoModalOverlay}>
          <div className={bannerStyles.videoModalContainer}>
            
            <video
              src={video}
              className={bannerStyles.videoModalIframe}
              controls
              autoPlay
            />

            <button
              onClick={() => setShowVideo(false)}
              className={bannerStyles.videoModalCloseButton}
            >
              <X className={bannerStyles.videoModalCloseIcon} />
            </button>

          </div>
        </div>
      )}
        <style jsx>{customStyles}</style>

    {/* Inline Animations */}
    
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      
    </div>
  );
};

export default Banner;
