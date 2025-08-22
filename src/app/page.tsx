import { AnimatedBackground } from '@/components/animated-background';
import { Chatbot } from '@/components/chatbot';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { Achievements, Certifications, Education, Experience, Projects, Skills } from '@/components/sections';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <AnimatedBackground />
        <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />

          <div className="space-y-24 md:space-y-32 my-24 md:my-32">
            <div className="max-w-4xl mx-auto">
              <Education />
            </div>
            <div className="max-w-5xl mx-auto">
              <Skills />
            </div>
            <div className="max-w-4xl mx-auto">
              <Experience />
            </div>
            <div className="max-w-5xl mx-auto">
              <Projects />
            </div>
            <div className="max-w-4xl mx-auto">
              <Certifications />
            </div>
            <div className="max-w-4xl mx-auto">
              <Achievements />
            </div>
            <div className="max-w-4xl mx-auto">
              <Contact />
            </div>
          </div>
        </main>        
        <Chatbot />
      </SidebarInset>
    </SidebarProvider>
  );
}
