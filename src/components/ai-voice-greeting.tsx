"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AiVoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    // Find the audio element once the component is mounted
    const audioElement = document.getElementById('welcome-audio-player') as HTMLAudioElement;
    if (audioElement) {
      audioRef.current = audioElement;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('ended', handleEnded);

      // Attempt to autoplay
      if (!hasAutoPlayed.current) {
        const autoplayTimeout = setTimeout(() => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().catch(err => {
              console.warn("Autoplay was prevented. User interaction is needed.");
            });
          }
        }, 1000); // 1-second delay to ensure everything is loaded
        hasAutoPlayed.current = true;
        return () => clearTimeout(autoplayTimeout);
      }
      
      // Cleanup listeners on unmount
      return () => {
        if (audioRef.current) {
            audioRef.current.removeEventListener('play', handlePlay);
            audioRef.current.removeEventListener('pause', handlePause);
            audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  const handleTogglePlay = async () => {
    if (!audioRef.current) {
      toast({
          title: "Audio Not Ready",
          description: "The welcome audio is still loading. Please wait a moment.",
          variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
          console.error("Audio play failed:", err)
          toast({
              title: "Playback Error",
              description: "Could not play the audio. Please interact with the page first.",
              variant: "destructive"
          })
      });
    }
  };

  return (
    <Button 
        onClick={handleTogglePlay} 
        size="lg" 
        variant="default" 
        className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/30"
    >
      {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
      {isPlaying ? 'Pause Greeting' : 'Play AI Welcome'}
    </Button>
  );
}
