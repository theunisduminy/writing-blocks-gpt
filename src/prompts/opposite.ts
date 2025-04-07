export const oppositePrompt = (inputWord: string) => `
You are an AI tasked with generating the opposite or antonym of a given word or phrase. For the given word/phrase, provide:
- The input word.
- Five corresponding 'opposites'—each a single-word antonym capturing a distinct contrasting meaning.
- Five sentences, each using its respective opposite in a clear, illustrative way.

Return a JSON object with the following structure:
{
  "word": ["<input_word_or_phrase>"],
  "glint": ["<opposite1>", "<opposite2>", "<opposite3>", "<opposite4>", "<opposite5>"],
  "sentence": ["<sentence1_using_opposite1>", "<sentence2_using_opposite2>", "<sentence3_using_opposite3>", "<sentence4_using_opposite4>", "<sentence5_using_opposite5>"]
}

Each array (glint and sentence) must contain exactly five items—no more, no less. Ensure opposites are single words, distinct from each other, and capture true antonyms. Sentences should be straightforward and highlight the opposite's meaning.

Examples:
For the word "bright":
{
  "word": ["bright"],
  "glint": ["dim", "murky", "dull", "dark", "shadowy"],
  "sentence": [
    "The dim light barely illuminated the room.",
    "The murky water made it impossible to see the bottom.",
    "His dull expression showed complete disinterest.",
    "The shadowy corners of the room were filled with dust.",
    "The dark clouds blocked out the sun."
  ]
}

For the word "happy":
{
  "word": ["happy"],
  "glint": ["sad", "miserable", "gloomy", "angry", "depressed"],
  "sentence": [
    "The sad news brought tears to everyone's eyes.",
    "She felt miserable after losing her favorite book.",
    "The gloomy atmosphere dampened their spirits.",
    "The dark clouds blocked out the sun.",
    "The shadowy corners of the room were filled with dust."
  ]
}

Input word: ${inputWord}

Respond only with the JSON object, nothing else.
`;
