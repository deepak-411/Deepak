"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { aiVoiceGreetings } from '@/ai/flows/ai-voice-greetings';

export function AiVoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTogglePlay = async () => {
    if (isLoading) return;

    // If audio is currently playing, pause it.
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    
    // If audio is paused but already loaded, play it.
    if (!isPlaying && audioRef.current && audioRef.current.src) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
    }

    // If there's no audio yet (first play), generate and play it.
    setIsLoading(true);
    try {
      // Use a generic greeting for the main page button.
      const result = await aiVoiceGreetings({ name: "visitor" });
      const newAudioDataUri = result.media;
      setAudioDataUri(newAudioDataUri);
      
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setIsPlaying(false);
      }
      
      audioRef.current.src = newAudioDataUri;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to generate or play AI greeting:", error);
      // Optionally, add a user-facing error message here.
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      );
    }
    if (isPlaying) {
      return (
        <>
          <Pause className="mr-2 h-5 w-5" />
          Pause Greeting
        </>
      );
    }
    return (
      <>
        <Play className="mr-2 h-5 w-5" />
        Play AI Welcome
      </>
    );
  };

  return (
    <Button 
      onClick={handleTogglePlay} 
      size="lg" 
      variant="default" 
      className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/30"
      disabled={isLoading}
    >
      {getButtonContent()}
    </Button>
  );
}
