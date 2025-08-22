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
import {z} from 'genkit';
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

const getProfileInfo = ai.defineTool(
  {
    name: 'getProfileInfo',
    description: "Get information from Deepak Kumar's profile. Use this to answer questions about his education, skills, experience, projects, certifications, and achievements.",
    inputSchema: z.object({
      query: z.string().describe('The specific section of the profile to retrieve (e.g., "education", "skills", "latest project").'),
    }),
    outputSchema: z.any(),
  },
  async (input) => {
    const query = input.query.toLowerCase();
    if (query.includes('education')) return profileData.education;
    if (query.includes('skill')) return profileData.skills;
    if (query.includes('experience') || query.includes('work')) return profileData.experiences;
    if (query.includes('project')) return profileData.projects;
    if (query.includes('certification') || query.includes('training')) return profileData.certifications;
    if (query.includes('achievement') || query.includes('award')) return profileData.achievements;
    return "I am sorry, I don't have enough information to answer that question. Please ask about Deepak's education, skills, experience, projects, or achievements.";
  }
);


export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const aiChatbotPrompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  input: {schema: AIChatbotInputSchema},
  output: {schema: AIChatbotOutputSchema},
  tools: [getProfileInfo],
  system: `You are a helpful AI assistant for Deepak Kumar's personal portfolio. 
  Your goal is to answer questions from visitors about Deepak.
  Use the getProfileInfo tool to retrieve information from his profile to answer the user's question.
  Be friendly and conversational.
  If the information is not in the profile, say that you don't have that information.`,
  prompt: `User's Question: {{question}}`,
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await aiChatbotPrompt(input);
    return output!;
  }
);
