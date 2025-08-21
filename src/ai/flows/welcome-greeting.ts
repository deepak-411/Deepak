'use server';

/**
 * @fileOverview Generates and caches a welcome greeting audio file.
 *
 * - welcomeGreeting - A function that returns the path to the greeting audio.
 * - WelcomeGreetingOutput - The return type for the welcomeGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import fs from 'fs/promises';
import path from 'path';

const WelcomeGreetingOutputSchema = z.object({
  media: z.string().describe('The static path to the audio file.'),
});
export type WelcomeGreetingOutput = z.infer<typeof WelcomeGreetingOutputSchema>;

export async function welcomeGreeting(): Promise<WelcomeGreetingOutput> {
  return welcomeGreetingFlow();
}

const GREETING_TEXT = "Welcome to my personal profile. This is Deepak Kumar here. Know me.";
const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
const AUDIO_PATH = path.join(AUDIO_DIR, 'welcome-greeting.wav');

async function generateAndCacheAudio(): Promise<string> {
  // Ensure the directory exists
  await fs.mkdir(AUDIO_DIR, { recursive: true });

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
    prompt: GREETING_TEXT,
  });

  if (!media) {
    throw new Error('No media returned from TTS API');
  }

  const audioBuffer = Buffer.from(
    media.url.substring(media.url.indexOf(',') + 1),
    'base64'
  );

  const wavBuffer = await toWav(audioBuffer);
  await fs.writeFile(AUDIO_PATH, wavBuffer);

  return '/audio/welcome-greeting.wav';
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (chunk) => bufs.push(chunk));
    writer.on('end', () => resolve(Buffer.concat(bufs)));
    
    writer.write(pcmData);
    writer.end();
  });
}

const welcomeGreetingFlow = ai.defineFlow(
  {
    name: 'welcomeGreetingFlow',
    inputSchema: z.void(),
    outputSchema: WelcomeGreetingOutputSchema,
  },
  async () => {
    try {
      // Check if the file already exists
      await fs.access(AUDIO_PATH);
      return { media: '/audio/welcome-greeting.wav' };
    } catch (error) {
      // File doesn't exist, so generate and cache it
      const mediaPath = await generateAndCacheAudio();
      return { media: mediaPath };
    }
  }
);
