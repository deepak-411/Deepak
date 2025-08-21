'use server';

/**
 * @fileOverview Returns a static path to the welcome greeting audio.
 *
 * - welcomeGreeting - A function that returns the greeting audio path.
 * - WelcomeGreetingOutput - The return type for the welcomeGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WelcomeGreetingOutputSchema = z.object({
  media: z.string().describe('The static path to the audio file.'),
});
export type WelcomeGreetingOutput = z.infer<typeof WelcomeGreetingOutputSchema>;

export async function welcomeGreeting(): Promise<WelcomeGreetingOutput> {
  return welcomeGreetingFlow();
}

const welcomeGreetingFlow = ai.defineFlow(
  {
    name: 'welcomeGreetingFlow',
    inputSchema: z.void(),
    outputSchema: WelcomeGreetingOutputSchema,
  },
  async () => {
    // Return a static path to the audio file in the public directory.
    return {
        media: '/audio/welcome-greeting.wav',
    };
  }
);
