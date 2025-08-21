"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { aiVoiceGreetings } from '@/ai/flows/ai-voice-greetings';
import { useToast } from '@/hooks/use-toast';

export function AiVoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleTogglePlay = async () => {
    if (isLoading) return;

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    
    if (!isPlaying && audioRef.current && audioRef.current.src) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
    }

    setIsLoading(true);
    try {
      const result = await aiVoiceGreetings({ name: "visitor" });
      const newAudioDataUri = result.media;
      
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onpause = () => setIsPlaying(false);
        audioRef.current.onplay = () => setIsPlaying(true);
      }
      
      audioRef.current.src = newAudioDataUri;
      await audioRef.current.play();
    } catch (error: any) {
      console.error("Failed to generate or play AI greeting:", error);
      
      const errorMessage = error.message || 'An unknown error occurred.';
      if (errorMessage.includes('429 Too Many Requests')) {
         toast({
          title: "Daily Limit Reached",
          description: "The AI voice greeting has reached its daily usage limit. Please try again tomorrow.",
          variant: "destructive",
        });
      } else {
         toast({
          title: "Error Generating Greeting",
          description: "Sorry, there was a problem generating the voice greeting. Please try again.",
          variant: "destructive",
        });
      }

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
