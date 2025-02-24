export const grammarSchema = {
  name: 'grammar_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      correctedText: {
        type: 'string',
        description: 'The corrected and improved version of the input text',
      },
      explanation: {
        type: 'string',
        description: 'Brief explanation of the major changes made',
      },
    },
    required: ['correctedText', 'explanation'],
    additionalProperties: false,
  },
};

export const findWordSchema = {
  name: 'glint_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      word: {
        type: 'array',
        items: { type: 'string' },
      },
      glint: {
        type: 'array',
        items: { type: 'string' },
      },
      sentence: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: ['word', 'glint', 'sentence'],
    additionalProperties: false,
  },
};

export const essaySchema = {
  name: 'essay_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Title of the essay',
      },
      essay: {
        type: 'string',
        description: 'Main content of the essay',
      },
    },
    required: ['title', 'essay'],
    additionalProperties: false,
  },
};

export const emailSchema = {
  name: 'email_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      subject: {
        type: 'string',
        description: 'Subject line of the email',
      },
      body: {
        type: 'string',
        description: 'Main content of the email',
      },
    },
    required: ['subject', 'body'],
    additionalProperties: false,
  },
};

export const summarySchema = {
  name: 'summary_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      oneSentence: {
        type: 'string',
        description: 'One sentence summary of the content',
      },
      mainPoints: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of main points from the content',
      },
      takeaways: {
        type: 'array',
        items: { type: 'string' },
        description: 'Key takeaways from the content',
      },
    },
    required: ['oneSentence', 'mainPoints', 'takeaways'],
    additionalProperties: false,
  },
};
