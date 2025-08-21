"use client";

import { useState, useRef, useEffect } from 'react';
import { welcomeGreeting } from '@/ai/flows/welcome-greeting';
import { Hero } from './hero';

export function WelcomeAudio() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function fetchAudio() {
      try {
        const { media } = await welcomeGreeting();
        setAudioUrl(media);
      } catch (error) {
        console.error("Failed to fetch welcome greeting:", error);
      }
    }
    fetchAudio();
  }, []);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      // Attempt to autoplay when the component mounts and has a valid URL
      audioRef.current.play().catch(error => {
        // Autoplay was prevented. This is a common browser policy.
        // The user can still start playback manually via the button.
        console.warn("Autoplay was prevented:", error.message);
      });
    }
  }, [audioUrl]);

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  const onPlaying = () => setIsPlaying(true);
  const onPauseOrEnd = () => setIsPlaying(false);

  return (
    <>
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onPlay={onPlaying}
          onPause={onPauseOrEnd}
          onEnded={onPauseOrEnd}
          // The 'autoPlay' attribute is only a hint for the browser
          autoPlay 
        />
      )}
      <Hero play={handlePlay} pause={handlePause} isPlaying={isPlaying} />
    </>
  );
}
