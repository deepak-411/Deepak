'use server';

/**
 * @fileOverview Generates a personalized, welcoming voice message using AI.
 *
 * - aiVoiceGreetings - A function that generates the greeting.
 * - AiVoiceGreetingsInput - The input type for the aiVoiceGreetings function.
 * - AiVoiceGreetingsOutput - The return type for the aiVoiceGreetings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

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
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: `Welcome to Deepak Kumar's personal profile, ${input.name}! I hope you enjoy your visit.`,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
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

    let bufs = [] as any[];
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
