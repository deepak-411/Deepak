"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { welcomeGreeting } from '@/ai/flows/welcome-greeting';

export function AiVoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchGreeting() {
      try {
        const greeting = await welcomeGreeting();
        setAudioUrl(greeting.media);
      } catch (error) {
        console.error("Failed to fetch greeting:", error);
        toast({
          title: "Audio Error",
          description: "Could not load the welcome greeting.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchGreeting();
  }, [toast]);

  useEffect(() => {
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
          console.warn("Autoplay was prevented by the browser.");
        });
      }

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

  if (isLoading) {
    return (
      <Button 
          size="lg" 
          variant="default" 
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/30"
          disabled={true}
      >
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading AI Welcome...
      </Button>
    )
  }

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
