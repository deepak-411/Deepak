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
        // Fetch the pre-generated audio URL
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

  // This effect runs when the audioRef is attached to the audio element.
  useEffect(() => {
    if (audioRef.current) {
        // Attempt to autoplay
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(error => {
          // Autoplay was likely prevented by the browser. 
          // This is expected behavior, so we don't need to show a user-facing error.
          // The user can manually start the audio with the button.
          console.warn("Autoplay was prevented by the browser.");
          setIsPlaying(false);
        });
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

  // Only render the audio element and button once the URL is available
  return (
    <>
      {audioUrl && (
        <audio 
          ref={audioRef}
          src={audioUrl} 
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          preload="auto"
        />
      )}
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
    </>
  );
}
