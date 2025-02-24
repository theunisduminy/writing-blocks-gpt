import OpenAI from 'openai';

export class OpenAIBase {
  protected client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}
