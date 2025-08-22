
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

const ShootingStar = () => {
    const [style, setStyle] = useState({});
  
    useEffect(() => {
      const generateStyle = () => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        setStyle({
          top: `${top}%`,
          left: `${left}%`,
          animation: `shootingStar ${duration}s ease-in-out ${delay}s infinite`,
        });
      };
      generateStyle();
    }, []);
  
    return <div className="shooting-star" style={style}></div>;
  };

export function AnimatedBackground() {
  const [stars, setStars] = useState<{size: number; top: string; left: string; duration: string}[]>([]);

  useEffect(() => {
    // This code now runs only on the client, preventing hydration errors.
    const generateStars = () => {
        const starArray = Array.from({ length: 100 }, () => ({
            size: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: `${Math.random() * 3 + 2}s`,
        }));
        setStars(starArray);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_hsl(var(--primary)/0.2),_transparent_70%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_90%,_hsl(var(--accent)/0.2),_transparent_70%)] animate-pulse-slow animation-delay-[-4s]"></div>

      <div className="absolute inset-0 z-10">
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
         {Array.from({ length: 5 }).map((_, i) => (
          <ShootingStar key={i} />
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

        .shooting-star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(to right, hsl(var(--primary)), transparent);
            border-radius: 50%;
            transform: translateX(100vw);
        }

        @keyframes shootingStar {
            0% {
                transform: translateX(-100vw) translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateX(100vw) translateY(100vh) scale(0);
                opacity: 0;
            }
        }
      `}</style>
    </div>
  );
}
