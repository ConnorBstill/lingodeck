export const fetchSpeechFromText = async (term: string) => {
  try {
    const response = await fetch(
      `api/text-to-speech?term=${encodeURIComponent(term)}`,
    );
  } catch (err) {}
};
