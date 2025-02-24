import { SchemaType } from '@google/generative-ai';

export const grammarSchema = {
  type: SchemaType.OBJECT as const,
  properties: {
    correctedText: {
      type: SchemaType.STRING as const,
      description: 'The corrected and improved version of the input text',
    },
    explanation: {
      type: SchemaType.STRING as const,
      description: 'Brief explanation of the major changes made',
    },
  },
  required: ['correctedText', 'explanation'],
};

export const findWordSchema = {
  type: SchemaType.OBJECT as const,
  properties: {
    word: {
      type: SchemaType.ARRAY as const,
      items: { type: SchemaType.STRING as const },
      description: 'Array of alternative words',
    },
    glint: {
      type: SchemaType.ARRAY as const,
      items: { type: SchemaType.STRING as const },
      description: 'Array of word associations',
    },
    sentence: {
      type: SchemaType.ARRAY as const,
      items: { type: SchemaType.STRING as const },
      description: 'Array of example sentences',
    },
  },
  required: ['word', 'glint', 'sentence'],
};

export const essaySchema = {
  type: SchemaType.OBJECT as const,
  properties: {
    title: {
      type: SchemaType.STRING as const,
      description: 'Title of the essay',
    },
    essay: {
      type: SchemaType.STRING as const,
      description: 'Main content of the essay',
    },
  },
  required: ['title', 'essay'],
};

export const emailSchema = {
  type: SchemaType.OBJECT as const,
  properties: {
    subject: {
      type: SchemaType.STRING as const,
      description: 'Subject line of the email',
    },
    body: {
      type: SchemaType.STRING as const,
      description: 'Main content of the email',
    },
  },
  required: ['subject', 'body'],
};

export const summarySchema = {
  type: SchemaType.OBJECT as const,
  properties: {
    oneSentence: {
      type: SchemaType.STRING as const,
      description: 'One sentence summary of the content',
    },
    mainPoints: {
      type: SchemaType.ARRAY as const,
      items: { type: SchemaType.STRING as const },
      description: 'List of main points from the content',
    },
    takeaways: {
      type: SchemaType.ARRAY as const,
      items: { type: SchemaType.STRING as const },
      description: 'Key takeaways from the content',
    },
  },
  required: ['oneSentence', 'mainPoints', 'takeaways'],
};
