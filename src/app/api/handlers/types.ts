export interface GrammarResponse {
  correctedText: string;
  explanation: string;
}

export interface FindWordResponse {
  word: string[];
  glint: string[];
  sentence: string[];
}

export interface EssayResponse {
  title: string;
  essay: string;
}

export interface EmailResponse {
  subject: string;
  body: string;
}

export interface SummaryResponse {
  oneSentence: string;
  mainPoints: string[];
  takeaways: string[];
}

export type WritingResponse = EssayResponse | EmailResponse | SummaryResponse;

export interface AIHandler {
  handleGrammarCheck(text: string): Promise<GrammarResponse>;
  handleFindWord(prompt: string, mode?: string): Promise<FindWordResponse>;
  handleWriting(notes: string, mode?: string): Promise<WritingResponse>;
}
