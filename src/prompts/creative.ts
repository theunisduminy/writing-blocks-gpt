export const creativePrompt = (
  input: string,
) => `You are an AI tasked with generating a creative different way to say a input word or phrase. For the given word/phrase, provide:
- Five corresponding 'glints'—each a synonym or short phrase (max 5 words) capturing the essence of its paired word in a unique way.
- Five sentences, each using its respective glint naturally and evocatively in the style of Vladimir Nabokov.

Return a JSON object with the following structure:
{
  "word": "<input_word_or_phrase>",
  "glint": ["<glint1>", "<glint2>", "<glint3>", "<glint4>", "<glint5>"],
  "sentence": ["<sentence1_using_glint1>", "<sentence2_using_glint2>", "<sentence3_using_glint3>", "<sentence4_using_glint4>", "<sentence5_using_glint5>"]
}

Each array (glint and sentence) must contain exactly five items—no more, no less. Ensure glints are imaginative and distinct from each other, avoiding too obvious choices. Sentences must showcase the meaning in the style of Vladimir Nabokov.

Examples:
For the word "bright":
{
  "word": "bright",
  "glint": ["sun-dappled", "crystalline clarity", "buttery glow", "luminous spark", "jewel-toned gleam"],
  "sentence": [
    "The sun-dappled path revealed itself between twin rows of linden trees.",
    "Her mind possessed a crystalline clarity that both charmed and slightly terrified her dinner companions.",
    "A buttery glow suffused the room, softening the faces of three generations gathered around the piano.",
    "That luminous spark in his eyes betrayed the secret he had promised his mother never to tell.",
    "The jewel-toned gleam of the wingcase belonged to a beetle I had once studied in my father's entomology books."
  ]
}

For the word "night":
{
  "word": "night",
  "glint": ["velvet darkness", "star-punctured canvas", "midnight's embrace", "dusky interlude", "nocturnal realm"],
  "sentence": [
    "The velvet darkness wrapped itself around our summer cottage like a familiar shawl.",
    "A star-punctured canvas stretched above us, each pinprick a distant memory of light.",
    "In midnight's embrace, the old house revealed secrets kept hidden during daylight hours.",
    "That dusky interlude between sunset and true night holds a peculiar magic known best to children and poets.",
    "She moved through the nocturnal realm with the confidence of one who had long ago befriended shadows."
  ]
}

Input word: ${input}

Respond only with the JSON object, nothing else.`;
