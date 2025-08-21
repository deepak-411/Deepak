"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Volume2, Play, Pause } from "lucide-react";
import { welcomeGreeting } from '@/ai/flows/welcome-greeting';
import { useToast } from "@/hooks/use-toast";

export function AiVoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const getAudioUrl = async () => {
    try {
        const greeting = await welcomeGreeting();
        return greeting.media;
    } catch (error) {
        console.error("Error getting audio URL", error);
        toast({
            title: "Error",
            description: "Could not load the welcome audio.",
            variant: "destructive",
        });
        return null;
    }
  }

  const handleTogglePlay = async () => {
    if (!audioRef.current) {
        const url = await getAudioUrl();
        if (url) {
            audioRef.current = new Audio(url);
            audioRef.current.onended = () => setIsPlaying(false);
        } else {
            return;
        }
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
          console.error("Audio play failed:", err)
          toast({
              title: "Playback Error",
              description: "Could not play the audio.",
              variant: "destructive"
          })
      });
      setIsPlaying(true);
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
