"use client";

import { useEffect, useRef, useState } from 'react';
import { aiVoiceGreetings } from '@/ai/flows/ai-voice-greetings';
import { useToast } from '@/hooks/use-toast';

export function WelcomeAudio({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const hasPlayed = useRef(false);

  useEffect(() => {
    const generateAndPlayAudio = async () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;
      setIsLoading(true);

      try {
        const result = await aiVoiceGreetings({ name: "visitor" });
        const newAudioDataUri = result.media;
        
        if (!audioRef.current) {
          audioRef.current = new Audio(newAudioDataUri);
        } else {
          audioRef.current.src = newAudioDataUri;
        }

        // Browsers may block autoplay until the user interacts with the page.
        // We'll try to play, but it might fail silently.
        await audioRef.current.play().catch(e => {
          console.warn("Autoplay was prevented by the browser.");
        });

      } catch (error: any) {
        console.error("Failed to generate or play AI greeting:", error);
        
        const errorMessage = error.message || 'An unknown error occurred.';
        if (errorMessage.includes('429 Too Many Requests')) {
           toast({
            title: "Daily Limit Reached",
            description: "The AI voice greeting has reached its daily usage limit. Please try again tomorrow.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    // Attempt to play after a short delay to ensure page is interactive
    const timer = setTimeout(() => {
        generateAndPlayAudio();
    }, 500);

    return () => clearTimeout(timer);

  }, [toast]);

  return <>{children}</>;
}
