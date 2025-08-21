'use server';

/**
 * @fileOverview Generates a welcoming voice message for the site.
 *
 * - welcomeGreeting - A function that generates the greeting.
 * - WelcomeGreetingOutput - The return type for the welcomeGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const WelcomeGreetingOutputSchema = z.object({
  media: z.string().describe('The audio data URI of the generated greeting.'),
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
      prompt: `Welcome to my personal profile.`,
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
