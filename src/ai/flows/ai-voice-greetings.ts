'use server';

/**
 * @fileOverview Generates a personalized, welcoming voice message using AI.
 *
 * - aiVoiceGreetings - A function that generates the greeting.
 * - AiVoiceGreetingsInput - The input type for the aiVoiceGreetings function.
 * - AiVoiceGreetingsOutput - The return type for the aiVoiceGreetings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import wav from 'wav';
import { geminiPro } from '@genkit-ai/googleai';

const AiVoiceGreetingsInputSchema = z.object({
  name: z.string().describe('The name of the visitor.'),
});
export type AiVoiceGreetingsInput = z.infer<typeof AiVoiceGreetingsInputSchema>;

const AiVoiceGreetingsOutputSchema = z.object({
  media: z.string().describe('The audio data URI of the generated greeting.'),
});
export type AiVoiceGreetingsOutput = z.infer<typeof AiVoiceGreetingsOutputSchema>;

export async function aiVoiceGreetings(input: AiVoiceGreetingsInput): Promise<AiVoiceGreetingsOutput> {
  return aiVoiceGreetingsFlow(input);
}

const aiVoiceGreetingsFlow = ai.defineFlow(
  {
    name: 'aiVoiceGreetingsFlow',
    inputSchema: AiVoiceGreetingsInputSchema,
    outputSchema: AiVoiceGreetingsOutputSchema,
  },
  async (input) => {
    const { media } = await geminiPro.generate({
      model: 'gemini-1.5-flash-tts-001',
      output: {
        format: 'audio',
        speech: {
            voice: 'Algenib',
        }
      },
      prompt: `Hello ${input.name}, welcome to my personal profile. This is Deepak Kumar. Feel free to ask me anything.`,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media!.url.substring(media!.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

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
