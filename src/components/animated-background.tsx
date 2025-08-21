"use client";

import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
       <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 animate-gradient-xy"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-pink-900 to-purple-900 animate-gradient-xy animation-delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-teal-900 to-blue-900 animate-gradient-xy animation-delay-4000"></div>
      </div>
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <style jsx>{`
        .bg-grid {
          background-image:
            linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px);
          background-size: 4rem 4rem;
          animation: pan-grid 200s linear infinite;
        }

        @keyframes pan-grid {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 200% 200%;
            background-position: 0% 50%;
            opacity: 0.1;
          }
          50% {
            background-size: 200% 200%;
            background-position: 100% 50%;
            opacity: 0.3;
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }

        .animation-delay-2000 {
            animation-delay: -5s;
        }

        .animation-delay-4000 {
            animation-delay: -10s;
        }
      `}</style>
    </div>
  )
}
