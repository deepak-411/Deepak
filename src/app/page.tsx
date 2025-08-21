import { AnimatedBackground } from '@/components/animated-background';
import { Chatbot } from '@/components/chatbot';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { Achievements, Certifications, Education, Experience, Projects, Skills } from '@/components/sections';
import { WelcomeAudio } from '@/components/welcome-audio';
import { welcomeGreeting } from '@/ai/flows/welcome-greeting';

export default async function Home() {
  const greeting = await welcomeGreeting();
  return (
    <>
      <WelcomeAudio audioUrl={greeting.media} />
      <AnimatedBackground />
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <div className="space-y-24 md:space-y-32 my-24 md:my-32">
          <Education />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Achievements />
          <Contact />
        </div>
      </main>
      <Chatbot />
    </>
  );
}
