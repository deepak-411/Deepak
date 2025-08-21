import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HiringForm } from "@/components/hiring-form";
import { ProjectForm } from "@/components/project-form";
import { Briefcase, Mail, Rocket } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="absolute top-4 left-4">
            <Button asChild variant="ghost">
                <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
        <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary glow">
                <Mail className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-muted-foreground">Contact Me</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Whether you have a job opportunity or a project idea, I'm excited to hear from you. Please select the appropriate tab below.
            </p>
        </div>
        
        <Tabs defaultValue="hiring" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hiring">
                <Briefcase className="mr-2 h-4 w-4"/>
                Hiring Inquiry
            </TabsTrigger>
            <TabsTrigger value="project">
                <Rocket className="mr-2 h-4 w-4"/>
                Project Proposal
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hiring" className="mt-6">
            <HiringForm />
          </TabsContent>
          <TabsContent value="project" className="mt-6">
            <ProjectForm />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
