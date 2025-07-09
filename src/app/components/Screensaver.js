"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { useScreensaverContext } from "../ScreensaverContext";

const Screensaver = ({ idleTimeout = 100000 }) => {
  const { screensaverDisabled, setScreensaverDisabled } =
    useScreensaverContext();
  const [isIdle, setIsIdle] = useState(false);

  // Idle detection logic
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeoutId);
    };
  }, [idleTimeout]);

  if (screensaverDisabled) return null;

  return (
    <>
      {isIdle && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Video background */}
          <video
            className="w-full h-full object-cover"
            src={"./screensaver.mp4"}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay over the video */}
          <div className="absolute inset-0 bg-black bg-opacity-95 z-40"></div>

          {/* Content layout */}
          <div className="w-full h-full absolute inset-0 flex flex-col">
            {/* Left Half - Logo */}
            <div className="h-[60vh] flex items-center justify-center z-50">
              <img src="./logo.png" alt="Logo" className="w-auto h-[60vw]" />
            </div>

            <div className="h-[10vh] flex justify-center items-center p-6 z-50">
              <button className="text-2xl px-4 py-2 border-2 border-yellow-500 text-yellow-500 bg-transparent rounded-lg">
                Tap to Start
              </button>
            </div>

            {/* Right Half - Text */}
            <div className="h-[30vh] w-full flex items-center justify-center text-center z-50 px-4">
              <h1 className="text-6xl font-bold text-white">
                Meet the <span className="text-yellow-500">EXPERTS</span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Screensaver;
