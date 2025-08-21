"use client";

import { useState, useRef, useEffect, Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { welcomeGreeting } from '@/ai/flows/welcome-greeting';

type WelcomeAudioProps = {
  children: ReactNode;
};

export function WelcomeAudio({ children }: WelcomeAudioProps) {
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

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.warn("Autoplay was prevented:", error.message);
      });
    }
  }, [audioUrl]);

  const onPlaying = () => setIsPlaying(true);
  const onPauseOrEnd = () => setIsPlaying(false);

  const child = Children.only(children);
  const childWithProps = isValidElement(child) 
    ? cloneElement(child as React.ReactElement<any>, { play: handlePlay, pause: handlePause, isPlaying })
    : child;

  return (
    <>
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onPlay={onPlaying}
          onPause={onPauseOrEnd}
          onEnded={onPauseOrEnd}
          autoPlay
        />
      )}
      {childWithProps}
    </>
  );
}
