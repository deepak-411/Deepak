"use client";

import { useRef, useEffect } from 'react';

export function WelcomeAudio({ audioUrl }: { audioUrl: string | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!audioUrl || hasPlayed.current) {
      return;
    }

    const playAudio = () => {
      // Ensure we have a valid audio element before playing
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play().catch(error => {
          console.warn("Autoplay was prevented by the browser.", error);
          // Fallback for browsers that block autoplay
          const playOnFirstInteraction = () => {
            if (audioRef.current) {
              audioRef.current.play().catch(err => console.error("Failed to play on interaction.", err));
            }
            window.removeEventListener('click', playOnFirstInteraction);
            window.removeEventListener('keydown', playOnFirstInteraction);
          };
          window.addEventListener('click', playOnFirstInteraction, { once: true });
          window.addEventListener('keydown', playOnFirstInteraction, { once: true });
        });
        hasPlayed.current = true; // Mark as played to prevent re-playing on re-renders
      }
    };

    // Delaying the play slightly can sometimes help with autoplay policies.
    const timeoutId = setTimeout(playAudio, 500);

    return () => clearTimeout(timeoutId);
  }, [audioUrl]);

  // Only render the audio element if the URL is available
  if (!audioUrl) {
    return null;
  }

  return <audio ref={audioRef} src={audioUrl} className="hidden" preload="auto" />;
}
