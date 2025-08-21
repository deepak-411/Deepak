"use client";

import { useRef, useEffect } from 'react';

export function WelcomeAudio({ audioUrl }: { audioUrl: string | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Browsers often require a user interaction to play audio.
    // This attempts to play it, but it might be blocked.
    // A more robust solution would be to play on the first click.
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.warn("Autoplay was prevented by the browser.", error);
                // As a fallback, we can play on the first user interaction.
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
        }
    }
    
    // Delaying the play slightly can sometimes help with autoplay policies.
    const timeoutId = setTimeout(playAudio, 500);

    return () => clearTimeout(timeoutId);

  }, [audioUrl]);

  if (!audioUrl) return null;

  return <audio ref={audioRef} src={audioUrl} className="hidden" />;
}
