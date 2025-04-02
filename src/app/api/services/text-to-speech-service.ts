import { ElevenLabsClient } from 'elevenlabs';

export const generateTextToSpeechBuffer = async (
  text: string,
  languageCode: string,
): Promise<Buffer> => {
  const audioClient = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });

  const audioStream = await audioClient.textToSpeech.convert(
    'a5n9pJUnAhX4fn7lx3uo',
    {
      output_format: 'mp3_44100_128',
      text: text,
      model_id: 'eleven_multilingual_v2',
      // language_code: languageCode,
    },
  );

  const audioChunks = [];

  for await (const chunk of audioStream) {
    audioChunks.push(chunk);
  }

  return Buffer.concat(audioChunks);
};
