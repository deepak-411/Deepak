'use server';
/**
 * @fileOverview An AI chatbot that answers questions and provides a spoken response.
 *
 * - aiVoiceChatbot - A function that handles the voice chatbot functionality.
 * - AIVoiceChatbotInput - The input type for the function.
 * - AIVoiceChatbotOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { aiChatbot } from './ai-chatbot';
import wav from 'wav';
import { geminiPro } from '@genkit-ai/googleai';

const AIVoiceChatbotInputSchema = z.object({
  question: z.string().describe('The user question about Deepak Kumar.'),
});
export type AIVoiceChatbotInput = z.infer<typeof AIVoiceChatbotInputSchema>;

const AIVoiceChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user question.'),
  audio: z.string().describe('The base64 encoded audio data URI of the spoken answer.'),
});
export type AIVoiceChatbotOutput = z.infer<typeof AIVoiceChatbotOutputSchema>;

export async function aiVoiceChatbot(input: AIVoiceChatbotInput): Promise<AIVoiceChatbotOutput> {
  return aiVoiceChatbotFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const aiVoiceChatbotFlow = ai.defineFlow(
  {
    name: 'aiVoiceChatbotFlow',
    inputSchema: AIVoiceChatbotInputSchema,
    outputSchema: AIVoiceChatbotOutputSchema,
  },
  async (input) => {
    // First, get the text answer from the regular chatbot.
    const textResponse = await aiChatbot({ question: input.question });
    const answer = textResponse.answer;
    let audioDataUri = '';

    try {
        // Then, generate audio from that text answer.
        const { media } = await geminiPro.generate({
          model: 'gemini-1.5-flash-tts-001',
          output: {
            format: 'audio',
            speech: {
                voice: 'Algenib',
            }
          },
          prompt: answer,
        });

        if (media) {
            const audioBuffer = Buffer.from(
              media!.url.substring(media!.url.indexOf(',') + 1),
              'base64'
            );
            const wavAudioBase64 = await toWav(audioBuffer);
            audioDataUri = 'data:audio/wav;base64,' + wavAudioBase64;
        }

    } catch (error: any) {
        // Handle quota errors gracefully
        if (error.message && error.message.includes('429')) {
            console.warn("AI voice quota exceeded. Falling back to text-only response.");
        } else {
            // Log other unexpected errors
            console.error("Error generating TTS audio:", error);
        }
        // In case of any error, we'll return an empty audio string.
        // The frontend will handle this by not showing the speaker icon.
    }

    return {
      answer: answer,
      audio: audioDataUri,
    };
  }
);
