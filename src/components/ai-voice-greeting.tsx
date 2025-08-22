"use client";

import { useEffect, useRef, useState } from 'react';
import { aiVoiceGreetings } from '@/ai/flows/ai-voice-greetings';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Loader2, Play, Pause } from 'lucide-react';

export function AiVoiceGreeting() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlayPause = async () => {
    if (isLoading) return;

    if (audioSrc && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play().catch(handlePlayError);
      }
      return;
    }

    setIsLoading(true);
    try {
      const result = await aiVoiceGreetings({ name: "visitor" });
      const newAudioDataUri = result.media;
      setAudioSrc(newAudioDataUri);
      
      const audio = new Audio(newAudioDataUri);
      audioRef.current = audio;
      
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      await audio.play().catch(handlePlayError);

    } catch (error: any) {
      console.error("Failed to generate or play AI greeting:", error);
      handleGenerationError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerationError = (error: any) => {
    const errorMessage = error.message || 'An unknown error occurred.';
    if (errorMessage.includes('429 Too Many Requests')) {
       toast({
        title: "Daily Limit Reached",
        description: "The AI voice greeting has reached its daily usage limit. Please try again tomorrow.",
        variant: "destructive",
      });
    } else {
      toast({
          title: "Error",
          description: "Could not generate the AI voice greeting. Please try again.",
          variant: "destructive",
      });
    }
  };

  const handlePlayError = (error: any) => {
      // Autoplay was prevented.
      console.warn("Audio autoplay was prevented by the browser.");
      setIsPlaying(false);
      toast({
        title: "Autoplay Blocked",
        description: "Your browser prevented audio from playing automatically. Click play to hear the greeting.",
      });
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('play', () => setIsPlaying(true));
        audio.removeEventListener('pause', () => setIsPlaying(false));
        audio.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, []);

  return (
    <Button onClick={handlePlayPause} disabled={isLoading} variant="outline" className="text-primary-foreground/80 border-primary/50 hover:bg-primary/20 hover:text-primary-foreground">
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : isPlaying ? (
        <Pause className="mr-2 h-5 w-5" />
      ) : (
        <Play className="mr-2 h-5 w-5" />
      )}
      {isLoading ? 'Generating...' : isPlaying ? 'Pause Welcome' : 'Play AI Welcome'}
    </Button>
  );
}
