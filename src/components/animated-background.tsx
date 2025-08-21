"use client";

import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_10%,_hsl(var(--primary)/0.3),_transparent_60%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_90%,_hsl(var(--accent)/0.3),_transparent_60%)] animate-pulse-slow animation-delay-[-4s]"></div>

      <div className="absolute inset-0 z-10 bg-grid"></div>

      <div className="absolute inset-0 z-20" style={{ boxShadow: 'inset 0 0 150px 50px hsl(var(--background))' }}></div>

      <style jsx>{`
        .bg-grid {
          --grid-color: hsl(var(--primary) / 0.1);
          --grid-size: 80px;
          background-image:
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
          background-size: var(--grid-size) var(--grid-size);
          animation: pan-grid 120s linear infinite;
        }

        @keyframes pan-grid {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
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
