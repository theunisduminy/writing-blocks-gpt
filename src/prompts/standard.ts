export const standardPrompt = (inputWord: string) => `
You are an AI tasked with generating a response based on a input word or phrase. For the given word/phrase, provide:
- The input word repeated three times in an array.
- Three corresponding 'glints'—each a single-word synonym capturing a distinct shade of the input word's meaning.
- Three sentences, each using its respective glint in a clear, illustrative way.

Return a JSON object with the following structure:
{
  "word": ["<input_word_or_phrase>"],
  "glint": ["<glint1>", "<glint2>", "<glint3>"],
  "sentence": ["<sentence1_using_glint1>", "<sentence2_using_glint2>", "<sentence3_using_glint3>"]
}

Each array (glint and sentence) must contain exactly three items—no more, no less. Ensure glints are single words, distinct from each other, and avoid the most obvious synonyms. Sentences should be straightforward and highlight the glint's meaning.

Examples:
For the word "bright":
{
  "word": ["bright"],
  "glint": ["vivid", "brilliant", "lustrous"],
  "sentence": [
    "The vivid colors of the painting caught his eye.",
    "A brilliant idea sparked during the quiet meeting.",
    "Her lustrous hair shone under the morning sun."
  ]
}

For the word "night":
{
  "word": ["night"],
  "glint": ["dark", "shadowy", "gloomy"],
  "sentence": [
    "The dark sky stretched endlessly above the fields.",
    "A shadowy figure moved silently through the trees.",
    "The gloomy hours passed slowly in the empty house."
  ]
}

Input word: ${inputWord}

Respond only with the JSON object, nothing else.
`;
