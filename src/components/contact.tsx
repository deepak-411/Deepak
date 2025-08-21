"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { sendEmail, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionWrapper } from './section-wrapper';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send } from 'lucide-react';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function Contact() {
  const [state, formAction] = useFormState(sendEmail, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Message Sent!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <SectionWrapper>
      <section id="contact">
        <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary glow">
                <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-muted-foreground">Get In Touch</h2>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">Have a question or want to work together? Drop me a message.</p>
        </div>
        
        <Card className="max-w-2xl mx-auto card-glow">
          <CardContent className="p-6 md:p-8">
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message..." required minLength={10} rows={5} />
              </div>
              <div className="flex justify-end">
                <SubmitButton />
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </SectionWrapper>
  );
}
// Add Card and CardContent to imports
import { Card, CardContent } from "@/components/ui/card";
