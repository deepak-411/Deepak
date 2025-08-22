"use client";

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { sendHiringEmail, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Submitting...' : 'Submit Inquiry'}
    </Button>
  );
}

export function HiringForm() {
  const [state, formAction] = useFormState(sendHiringEmail, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Inquiry Sent!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="card-glow">
      <CardHeader>
        <CardTitle>Job Opportunity</CardTitle>
        <CardDescription>
          I'm excited to learn about potential roles. Please provide the details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="e.g. Jane Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" name="email" type="email" placeholder="jane.doe@company.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" name="company" type="text" placeholder="e.g. Acme Inc." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title / Role</Label>
              <Input id="jobTitle" name="jobTitle" type="text" placeholder="e.g. Senior Software Engineer" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description or Link</Label>
            <Textarea id="jobDescription" name="jobDescription" placeholder="Please paste the job description or a link to the job posting." required rows={6} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea id="message" name="message" placeholder="Any other details you'd like to share?" rows={4} />
          </div>
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
