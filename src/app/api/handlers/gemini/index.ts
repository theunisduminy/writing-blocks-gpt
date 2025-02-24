import {
  AIHandler,
  FindWordResponse,
  GrammarResponse,
  WritingResponse,
} from '../types';
import { FindWordHandler } from './find-word';
import { GrammarHandler } from './check-grammar';
import { WritingHandler } from './handle-writing';

export class GeminiHandler implements AIHandler {
  private findWordHandler: FindWordHandler;
  private grammarHandler: GrammarHandler;
  private writingHandler: WritingHandler;

  constructor() {
    this.findWordHandler = new FindWordHandler();
    this.grammarHandler = new GrammarHandler();
    this.writingHandler = new WritingHandler();
  }

  async handleFindWord(
    prompt: string,
    mode?: string,
  ): Promise<FindWordResponse> {
    return this.findWordHandler.handle(prompt, mode);
  }

  async handleGrammarCheck(text: string): Promise<GrammarResponse> {
    return this.grammarHandler.handle(text);
  }

  async handleWriting(notes: string, mode?: string): Promise<WritingResponse> {
    return this.writingHandler.handle(notes, mode);
  }
}
