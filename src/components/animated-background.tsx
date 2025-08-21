"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 bg-black">
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,_hsl(var(--accent)/0.8),_transparent_100%)]"></div>
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,_transparent_40%,_hsl(var(--secondary))_100%)]"></div>
        </div>
        <div className="absolute inset-0 z-10 bg-grid"></div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/80 to-transparent"></div>

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
      `}</style>
    </div>
  )
}
