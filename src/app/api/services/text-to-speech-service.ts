import { ElevenLabsClient } from 'elevenlabs';

export const generateTextToSpeechBuffer = async (
  text: string,
): Promise<Buffer> => {
  const audioClient = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });

  const audioStream = await audioClient.generate({
    output_format: 'mp3_44100_128',
    text,
    model_id: 'eleven_multilingual_v2',
  });

  const audioChunks = [];

  for await (const chunk of audioStream) {
    audioChunks.push(chunk);
  }

  return Buffer.concat(audioChunks);
};
