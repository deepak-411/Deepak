"use client";

import { useEffect, useRef } from 'react';
import { aiVoiceGreetings } from '@/ai/flows/ai-voice-greetings';
import { useToast } from '@/hooks/use-toast';

export function WelcomeAudio() {
  const { toast } = useToast();
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const playGreeting = async () => {
      try {
        const result = await aiVoiceGreetings({ name: "visitor" });
        const audio = new Audio(result.media);
        await audio.play();
      } catch (error: any) {
        console.error("Failed to generate or play AI greeting:", error);
        
        const errorMessage = error.message || 'An unknown error occurred.';
        if (errorMessage.includes('429 Too Many Requests')) {
           toast({
            title: "Daily Limit Reached",
            description: "The AI voice greeting has reached its daily usage limit and cannot be played automatically. Please try again tomorrow.",
            variant: "destructive",
          });
        } else if (error.name === 'NotAllowedError') {
            // This case might not be needed if the browser just pauses playback, but is good practice.
            console.warn("Audio autoplay was prevented by the browser.");
        } else {
            // Generic error for other issues
            toast({
                title: "Greeting Error",
                description: "The welcome greeting could not be played.",
                variant: "destructive",
            });
        }
      }
    };

    // Delay slightly to ensure the page is interactive
    const timeoutId = setTimeout(playGreeting, 500);

    return () => clearTimeout(timeoutId);

  }, [toast]);

  return null; // This component does not render anything
}
