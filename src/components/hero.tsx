"use client";
import Image from 'next/image';
import { AiVoiceGreeting } from './ai-voice-greeting';
import { SectionWrapper } from './section-wrapper';
import Link from 'next/link';
import { Button } from './ui/button';
import { Download, Github, Linkedin } from 'lucide-react';

type HeroProps = {
  play?: () => void;
  pause?: () => void;
  isPlaying?: boolean;
}

// This is a Client Component because it receives functions as props.
export function Hero({ play, pause, isPlaying }: HeroProps) {
  
  const handlePlay = play || (() => {});
  const handlePause = pause || (() => {});
  const playing = isPlaying || false;
  
  return (
    <SectionWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="relative mb-8 h-40 w-40 md:h-48 md:w-48">
          <Image
            src="https://media.licdn.com/dms/image/v2/D5603AQE53GASePk1fg/profile-displayphoto-shrink_200_200/B56ZV_zCToHEAg-/0/1741605841497?e=2147483647&v=beta&t=SfoL_GJQIBprLHH2zIf0TkwTNLVKPT9h10OtLeqkpmo"
            alt="Deepak Kumar"
            width={200}
            height={200}
            priority
            className="rounded-full object-cover border-4 border-primary shadow-lg"
            data-ai-hint="profile picture"
          />
           <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold threed-text bg-clip-text text-transparent bg-gradient-to-b from-primary-foreground to-muted-foreground">
          Deepak Kumar
        </h1>
        <p className="mt-4 max-w-3xl text-2xl md:text-4xl font-bold text-primary-foreground glow">
          Innovator • Software Engineer • AI/ML Enthusiast
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild variant="ghost">
                <Link href="https://in.linkedin.com/in/deepak-kumar-587a011a5" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                </Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="https://github.com/deepak-411" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                </Link>
            </Button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
            <Link href="https://deepakkumarinnovator.netlify.app/" target="_blank" rel="noopener noreferrer" className="glass-button px-8 py-3 text-lg text-primary-foreground">
                Visit my official website
            </Link>
            <AiVoiceGreeting play={handlePlay} pause={handlePause} isPlaying={playing} />
        </div>
      </div>
    </SectionWrapper>
  );
}
