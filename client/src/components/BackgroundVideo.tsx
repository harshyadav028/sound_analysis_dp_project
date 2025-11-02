import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on load and set playback speed
    const playVideo = async () => {
      if (videoRef.current) {
        // Set playback speed (1.0 is normal, 1.5 is 50% faster, 2.0 is double speed)
        videoRef.current.playbackRate = 1.5;

        try {
          await videoRef.current.play();
          console.log(
            "Background video playing at",
            videoRef.current.playbackRate,
            "x speed"
          );
        } catch (error) {
          console.log("Video autoplay prevented:", error);
          // Fallback: try playing on user interaction
          document.addEventListener(
            "click",
            () => {
              videoRef.current?.play();
            },
            { once: true }
          );
        }
      }
    };

    playVideo();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.8) contrast(1.1)",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility - adjusts based on theme */}
      {/* Light mode: more opaque white overlay, Dark mode: more opaque dark overlay */}
      <div className="absolute inset-0 bg-white/55 dark:bg-black/55 backdrop-blur-[0px]" />
    </div>
  );
}
