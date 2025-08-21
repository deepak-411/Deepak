"use client";

import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-black opacity-90"></div>
      
      {/* KBC-style lighting */}
      <div className="absolute inset-0 z-0">
        {/* Central yellow/gold spotlight */}
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,_hsl(var(--primary)/0.6),_transparent_80%)] animate-pulse-slow"></div>
        
        {/* Outer blue/purple glow */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,_transparent_40%,_hsl(var(--accent)/0.5)_100%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0" id="particles-js"></div>
      </div>
      
      {/* Grid floor */}
      <div className="absolute inset-0 z-10 bg-grid"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <div className="absolute inset-0 z-20" style={{ boxShadow: 'inset 0 0 150px 50px hsl(var(--background))' }}></div>

      <style jsx>{`
        .bg-grid {
          --grid-color: hsl(var(--primary) / 0.15);
          --grid-size: 100px;
          background-image:
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
          background-size: var(--grid-size) var(--grid-size);
          animation: pan-grid 180s linear infinite;
        }

        @keyframes pan-grid {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
      <React.Fragment>
        <script async src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function () {
              if (window.particlesJS) {
                window.particlesJS('particles-js', {
                  "particles": {
                    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#ffd700" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                    "size": { "value": 2, "random": true, "anim": { "enable": false } },
                    "line_linked": { "enable": false },
                    "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
                  },
                  "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
                  "retina_detect": true
                });
              }
            });
          `,
          }}
        />
      </React.Fragment>
    </div>
  );
}
