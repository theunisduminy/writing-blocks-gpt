export const differentPrompt = (inputWord: string) => `
You are an AI tasked with generating a response based on a input word or phrase. For the given word/phrase, provide:
- The input word.
- five corresponding 'glints'—each a single-word synonym capturing a distinct shade of the input word's meaning.
- five sentences, each using its respective glint in a clear, illustrative way.

Return a JSON object with the following structure:
{
  "word": ["<input_word_or_phrase>"],
  "glint": ["<glint1>", "<glint2>", "<glint3>", "<glint4>", "<glint5>"],
  "sentence": ["<sentence1_using_glint1>", "<sentence2_using_glint2>", "<sentence3_using_glint3>", "<sentence4_using_glint4>", "<sentence5_using_glint5>"]
}

Each array (glint and sentence) must contain exactly five items—no more, no less. Ensure glints are single words, distinct from each other, and avoid the most obvious synonyms. Sentences should be straightforward and highlight the glint's meaning.

Examples:
For the word "bright":
{
  "word": ["bright"],
  "glint": ["vivid", "brilliant", "lustrous", "radiant", "shining"],
  "sentence": [
    "The vivid colors of the painting caught his eye.",
    "A brilliant idea sparked during the quiet meeting.",
    "Her lustrous hair shone under the morning sun.",
    "The radiant smile of the child lit up the room.",
    "The shining stars in the sky were a sight to behold."
  ]
}

For the word "night":
{
  "word": ["night"],
  "glint": ["dark", "shadowy", "gloomy", "twilight", "twinkle"],
  "sentence": [
    "The dark sky stretched endlessly above the fields.",
    "A shadowy figure moved silently through the trees.",
    "The gloomy hours passed slowly in the empty house.",
    "The twilight hours of the day were a time of peace and tranquility.",
    "The twinkling stars in the sky were a sight to behold."
  ]
}

Input word: ${inputWord}

Respond only with the JSON object, nothing else.
`;
