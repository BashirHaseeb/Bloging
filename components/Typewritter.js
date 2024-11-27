"use client"
import { useState, useEffect } from "react";

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        // Reset after completing
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 2000); // Pause for 1 second before restarting
      }
    }, 100); // Typing speed: 100ms per character

    return () => clearInterval(typingInterval);
  }, [index, text]);

  return (
    <div style={{ fontFamily: "monospace", whiteSpace: "pre" }} className="text-center text-2xl md:text-4xl" >
      {displayedText}
      <span className="cursor">|</span>
      <style jsx>{`
        .cursor {
          display: inline-block;
          background-color: black;
          color: white;
          margin-left: 3px;
          width: 10px;
          animation: blink 0.6s steps(2, start) infinite;
        }

        @keyframes blink {
          0%,
          100% {
            background-color: black;
          }
          50% {
            background-color: white;
          }
        }
      `}</style>
    </div>
  );
};

export default TypewriterEffect;
