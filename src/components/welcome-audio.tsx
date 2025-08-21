"use client";

// This component is only responsible for rendering the audio tag.
// Control is handled by AiVoiceGreeting.tsx
export function WelcomeAudio({ audioUrl }: { audioUrl: string | null }) {
  if (!audioUrl) {
    return null;
  }

  return (
    <audio 
      id="welcome-audio-player" 
      src={audioUrl} 
      className="hidden" 
      preload="auto" 
    />
  );
}
