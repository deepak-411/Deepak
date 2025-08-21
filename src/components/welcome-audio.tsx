"use client";

import { useRef, useEffect } from 'react';

export function WelcomeAudio({ audioUrl }: { audioUrl: string | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    // This effect now only handles playing the audio, not creating it.
    if (!audioUrl || hasPlayed.current || !audioRef.current) {
      return;
    }

    const playAudio = () => {
      if (audioRef.current) {
         audioRef.current.play().catch(error => {
          console.warn("Autoplay was prevented by the browser. A user interaction is required.", error);
          // Set up a one-time event listener to play on the first user interaction.
          const playOnFirstInteraction = () => {
            if (audioRef.current && !hasPlayed.current) {
              audioRef.current.play().catch(err => console.error("Failed to play on interaction.", err));
              hasPlayed.current = true; // Mark as played
            }
            // Clean up listeners
            window.removeEventListener('click', playOnFirstInteraction);
            window.removeEventListener('keydown', playOnFirstInteraction);
          };
          window.addEventListener('click', playOnFirstInteraction, { once: true });
          window.addEventListener('keydown', playOnFirstInteraction, { once: true });
        });
        hasPlayed.current = true; // Mark that we've attempted to play
      }
    };
    
    // A small delay can help with browser autoplay policies.
    const timeoutId = setTimeout(playAudio, 500);

    return () => clearTimeout(timeoutId);

  }, [audioUrl]);
  
  // Conditionally render the audio element only when audioUrl is a valid string.
  // This is the key fix for the "no supported sources" error.
  if (!audioUrl) {
    return null;
  }

  return <audio id="welcome-audio-player" ref={audioRef} src={audioUrl} className="hidden" preload="auto" />;
}
