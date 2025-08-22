"use client";
import Image from 'next/image';
import { SectionWrapper } from './section-wrapper';
import Link from 'next/link';
import { Button } from './ui/button';
import { Github, Linkedin } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { AiVoiceGreeting } from './ai-voice-greeting';

export function Hero() {
  
  return (
    <SectionWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        
        <div className="absolute top-5 left-5 z-20">
          <SidebarTrigger />
        </div>

        <div className="relative w-full max-w-2xl flex items-center justify-center -mt-20">
           {/* Inner Content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                 <div className="relative mb-6 h-40 w-40 md:h-48 md:w-48">
                    <Image
                        src="https://media.licdn.com/dms/image/v2/D5603AQE53GASePk1fg/profile-displayphoto-shrink_200_200/B56ZV_zCToHEAg-/0/1741605841497?e=2147483647&v=beta&t=SfoL_GJQIBprLHH2zIf0TkwTNLVKPT9h10OtLeqkpmo"
                        alt="Deepak Kumar"
                        width={200}
                        height={200}
                        priority
                        className="rounded-full object-cover border-4 border-primary/50 shadow-lg shadow-[hsl(var(--primary)/0.5)]"
                        data-ai-hint="profile picture"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping-slow opacity-75"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse-slow opacity-50 animation-delay-[-2s]"></div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold kbc-title">
                  Deepak Kumar
                </h1>
                <p className="mt-4 max-w-3xl text-2xl md:text-3xl font-bold kbc-subtitle">
                  Software Engineer • AI/ML Enthusiast
                </p>

                 <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                    <Button asChild variant="ghost" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
                        <Link href="https://in.linkedin.com/in/deepak-kumar-587a011a5" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-5 w-5" />
                            LinkedIn
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
                        <Link href="https://github.com/deepak-411" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-5 w-5" />
                            GitHub
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
            <AiVoiceGreeting />
             <Link href="https://deepakkumarinnovator.netlify.app/" target="_blank" rel="noopener noreferrer" className="glass-button px-8 py-3 text-lg text-primary-foreground border-primary/50 hover:border-primary">
                Visit my official website
            </Link>
        </div>
        <style jsx>{`
            @keyframes ping-slow {
                75%, 100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
            .animate-ping-slow {
                animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
             @keyframes pulse-slow {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
            }
            .animate-pulse-slow {
                animation: pulse-slow 5s infinite ease-in-out;
            }
            .animation-delay-[-2s] {
                animation-delay: -2s;
            }
        `}</style>
      </div>
    </SectionWrapper>
  );
}
