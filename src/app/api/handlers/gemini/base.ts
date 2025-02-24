import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiBase {
  protected client: GoogleGenerativeAI;

  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
  }
}
