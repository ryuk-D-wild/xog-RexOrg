"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = ({ 
  children, 
  width = "192px", 
  height = "64px", 
  borderColor = "#ff4d9e", 
  backgroundColor = "#0d0d2f", 
  textColor = "#ff4d9e", 
  borderRadius = "0.5rem", // Default to a rectangle
  transparent = false // New prop for transparency
}) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const maxDistance = 200;
      const intensity = Math.max(0, 1 - distance / maxDistance);

      gsap.to(button, {
        x: distanceX * intensity * 0.3,
        y: distanceY * intensity * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(text, {
        x: distanceX * intensity * 0.5,
        y: distanceY * intensity * 0.5,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
      <button
        ref={buttonRef}
        style={{
          position: "relative",
          width,
          height,
          fontSize: "1.125rem",
          fontWeight: "bold",
          border: `2px solid ${borderColor}`,
          borderRadius, // Now customizable
          overflow: "hidden",
          color: textColor,
          backgroundColor: transparent ? "transparent" : backgroundColor, // If transparent, no bg
          cursor: "pointer",
          transition: "all 0.3s ease",
          backdropFilter: transparent ? "blur(10px)" : "none", // Adds a glassmorphism effect
        }}
      >
        <span ref={textRef} style={{ position: "relative", display: "block", transition: "transform 0.3s ease" }}>
          {children}
        </span>
      </button>
    </div>
  );
};

export default AnimatedButton;
