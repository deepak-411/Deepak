"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 animate-gradient-xy-slow opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-teal-500 via-cyan-600 to-sky-700 animate-gradient-xy opacity-30 animation-delay-5s"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-600 animate-gradient-xy-fast opacity-25 animation-delay-10s"></div>
      </div>
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <style jsx>{`
        .bg-grid {
          background-image:
            linear-gradient(to right, hsl(var(--border) / 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.25) 1px, transparent 1px);
          background-size: 3rem 3rem;
          animation: pan-grid 120s linear infinite;
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
            background-size: 250% 250%;
            background-position: 0% 50%;
          }
          50% {
            background-size: 250% 250%;
            background-position: 100% 50%;
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 20s ease infinite;
        }
        .animate-gradient-xy-slow {
          animation: gradient-xy 25s ease infinite;
        }
        .animate-gradient-xy-fast {
          animation: gradient-xy 15s ease infinite;
        }

        .animation-delay-5s {
            animation-delay: -5s;
        }
        .animation-delay-10s {
            animation-delay: -10s;
        }
      `}</style>
    </div>
  )
}
