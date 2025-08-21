"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiVoiceGreetings } from '@/ai/flows/ai-voice-greetings';

export function AiVoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleTogglePlay = async () => {
    if (isLoading) return;

    // If audio is playing, pause it.
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    
    // If audio is paused, play it.
    if (!isPlaying && audioRef.current && audioRef.current.src && audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        handlePlayError(error);
      }
      return;
    }

    // If audio has not been loaded yet, generate and play it.
    setIsLoading(true);
    try {
      const { media } = await aiVoiceGreetings({ name: 'Guest' });
      
      if (!audioRef.current) {
        audioRef.current = new Audio(media);
        audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      } else {
        audioRef.current.src = media;
      }
      
      await audioRef.current.play();
      setIsPlaying(true);

    } catch (error) {
      console.error("Failed to generate or play audio:", error);
      toast({
        title: "Audio Error",
        description: "Could not generate or play the welcome greeting. Please try again later.",
        variant: "destructive",
      });
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayError = (err: any) => {
    console.error("Audio play failed:", err);
    toast({
      title: "Playback Error",
      description: "Could not play the audio. Your browser may have blocked it.",
      variant: "destructive"
    });
    setIsPlaying(false);
  }

  return (
    <Button 
      onClick={handleTogglePlay} 
      size="lg" 
      variant="default" 
      className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/30"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : isPlaying ? (
        <Pause className="mr-2 h-5 w-5" />
      ) : (
        <Play className="mr-2 h-5 w-5" />
      )}
      {isLoading ? 'Generating Audio...' : isPlaying ? 'Pause Greeting' : 'Play AI Welcome'}
    </Button>
  );
}
