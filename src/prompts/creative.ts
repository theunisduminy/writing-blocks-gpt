export const creativePrompt = (
  input: string,
) => `You are an AI tasked with generating a creative different way to say a input word or phrase. For the given word/phrase, provide:
- Three corresponding 'glints'—each a synonym or short phrase (max 5 words) capturing the essence of its paired word in a unique way.
- Three sentences, each using its respective glint naturally and evocatively in the style of Vladimir Nabokov.

Return a JSON object with the following structure:
{
  "word": ["<input_word_or_phrase>"],
  "glint": ["<glint1>", "<glint2>", "<glint3>"],
  "sentence": ["<sentence1_using_glint1>", "<sentence2_using_glint2>", "<sentence3_using_glint3>"]
}

Each array (glint and sentence) must contain exactly three items—no more, no less. Ensure glints are imaginative and distinct from each other, avoiding too obvious choices. Sentences must showcase the meaning in the style of Vladimir Nabokov.

Examples:
For the word "bright":
{
  "word": ["bright"],
  "glint": ["radiant", "luminous", "gleaming"],
  "sentence": [
    "Her radiant smile warmed the room.",
    "Luminous stars pierced the velvet sky.",
    "The gleaming sea beckoned them forward."
  ]
}

For the word "night":
{
  "word": ["night"],
  "glint": ["twilight's veil", "midnight's hush", "evening's glow"],
  "sentence": [
    "Twilight's veil softened the horizon.",
    "Midnight's hush cloaked the world in peace.",
    "Evening's glow painted the sky gold."
  ]
}

Input word: ${input}

Respond only with the JSON object, nothing else.`;
