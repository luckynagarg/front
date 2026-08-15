"use client";

import { useEffect, useState, type ReactNode } from "react";

interface InteractiveBackgroundProps {
  children: ReactNode;
}

const InteractiveBackground = ({
  children,
}: InteractiveBackgroundProps) => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle 500px at ${mouse.x}px ${mouse.y}px,
            rgba(14, 165, 233, 0.12),
            transparent 70%
          ),
          linear-gradient(135deg, #dbeafe, #c7d2fe, #ccfbf1)
        `,
      }}
    >
      {/* Interactive Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(14, 116, 144, 0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(14, 116, 144, 0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "35px 25px",
        }}
      />

      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute h-80 w-80 rounded-full blur-2xl transition-all duration-300"
        style={{
          left: mouse.x - 160,
          top: mouse.y - 160,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.22), transparent 60%)",
        }}
      />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -left-10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default InteractiveBackground;