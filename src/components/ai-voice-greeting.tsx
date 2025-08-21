"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AiVoiceGreeting({ audioUrl }: { audioUrl: string | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // When the component mounts, we create the audio element
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      
      const audio = audioRef.current;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handlePause);

      // Attempt to autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented. This is expected in many browsers.
          // The user can still start playback with the button.
          console.warn("Autoplay was prevented by the browser. User interaction is required.");
        });
      }

      // Cleanup on unmount
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handlePause);
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [audioUrl]);

  const handleTogglePlay = () => {
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
              description: "Could not play the audio. Your browser may be blocking it.",
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
        disabled={!audioUrl}
    >
      {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
      {isPlaying ? 'Pause Greeting' : 'Play AI Welcome'}
    </Button>
  );
}
