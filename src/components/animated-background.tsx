import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <style jsx>{`
        .bg-grid {
          background-image:
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
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
      `}</style>
    </div>
  )
}
