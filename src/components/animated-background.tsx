
"use client";

import React, { useState, useEffect } from 'react';

const Star = ({ size, top, left, duration }: { size: number; top: string; left: string; duration: string; }) => (
  <div
    className="absolute rounded-full bg-primary"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      animation: `twinkle ${duration} infinite ease`,
      boxShadow: `0 0 ${size * 2}px hsl(var(--primary))`,
    }}
  />
);

export function AnimatedBackground() {
  const [stars, setStars] = useState<{size: number; top: string; left: string; duration: string}[]>([]);

  useEffect(() => {
    const starArray = [];
    for (let i = 0; i < 100; i++) {
      starArray.push({
        size: Math.random() * 2 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 3 + 2}s`,
      });
    }
    setStars(starArray);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_hsl(var(--primary)/0.2),_transparent_70%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_90%,_hsl(var(--accent)/0.2),_transparent_70%)] animate-pulse-slow animation-delay-[-4s]"></div>

      <div className="absolute inset-0 z-10">
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
      </div>

      <div className="absolute inset-0 z-20" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)' }}></div>
      <div className="absolute inset-0 z-20" style={{ boxShadow: 'inset 0 0 200px 70px hsl(var(--background))' }}></div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animation-delay-[-4s] {
          animation-delay: -4s;
        }
      `}</style>
    </div>
  );
}
