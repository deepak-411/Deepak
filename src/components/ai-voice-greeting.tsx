"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { welcomeGreeting } from '@/ai/flows/welcome-greeting';

type AiVoiceGreetingProps = {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
};

export function AiVoiceGreeting({ play, pause, isPlaying }: AiVoiceGreetingProps) {
  const handleTogglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <Button 
      onClick={handleTogglePlay} 
      size="lg" 
      variant="default" 
      className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-primary/30"
    >
      {isPlaying ? (
        <Pause className="mr-2 h-5 w-5" />
      ) : (
        <Play className="mr-2 h-5 w-5" />
      )}
      {isPlaying ? 'Pause Greeting' : 'Play AI Welcome'}
    </Button>
  );
}
