import Image from 'next/image';
import { profile } from '@/lib/data';
import { AiVoiceGreeting } from './ai-voice-greeting';
import { SectionWrapper } from './section-wrapper';

export function Hero() {
  return (
    <SectionWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="relative mb-8 h-40 w-40 md:h-48 md:w-48">
          <Image
            src="https://placehold.co/200x200/6F00FF/FFFFFF.png"
            alt="Deepak Kumar"
            width={200}
            height={200}
            priority
            className="rounded-full object-cover border-4 border-primary shadow-lg"
            data-ai-hint="man portrait"
          />
           <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold threed-text bg-clip-text text-transparent bg-gradient-to-b from-primary-foreground to-muted-foreground">
          Deepak's Digital Domain
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
          {profile.title}
        </p>
        <div className="mt-8">
          <AiVoiceGreeting />
        </div>
      </div>
    </SectionWrapper>
  );
}
