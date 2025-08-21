"use client";

import { SectionWrapper } from './section-wrapper';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Contact() {
  return (
    <SectionWrapper>
      <section id="contact">
        <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary glow">
                <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-muted-foreground">Get In Touch</h2>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">Have a job opportunity or a project idea? I'd love to hear from you. Click the button below to open my dedicated contact page.</p>
        </div>
        
        <div className="flex justify-center">
            <Button asChild size="lg">
                <Link href="/contact">
                    Contact Me <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </section>
    </SectionWrapper>
  );
}
