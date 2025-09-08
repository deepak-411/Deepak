// ai-chatbot.ts
'use server';
/**
 * @fileOverview An AI chatbot that answers questions about Deepak Kumar based on his profile data.
 *
 * - aiChatbot - A function that handles the chatbot functionality.
 * - AIChatbotInput - The input type for the aiChatbot function.
 * - AIChatbotOutput - The return type for the aiChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { achievements, certifications, education, experiences, projects, skills } from '@/lib/data';


const AIChatbotInputSchema = z.object({
  question: z.string().describe('The user question about Deepak Kumar.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user question.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

const profileData = {
  education,
  skills,
  experiences,
  projects,
  certifications,
  achievements
};

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const aiChatbotPrompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  inputSchema: AIChatbotInputSchema,
  outputSchema: AIChatbotOutputSchema,
  system: `You are a helpful and friendly AI assistant for Deepak Kumar's personal portfolio. 
Your goal is to answer questions from visitors about Deepak based on the profile information provided below.
Be conversational and answer in a clear and concise manner.
If the information is not in the profile, politely say that you don't have that information.

Here is Deepak Kumar's profile data:
---
${JSON.stringify(profileData, null, 2)}
---
`,
  prompt: `User's Question: {{question}}`,
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async (input) => {
    const result = await aiChatbotPrompt(input);
    return result.output!;
  }
);
