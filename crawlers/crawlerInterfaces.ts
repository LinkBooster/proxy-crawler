export interface ICrawler {
  baseUrl: string;
  loadHtml(url: string): Promise<void>;
  parse(): Promise<object[]>;
  getNumberOfPages?(): Promise<number>;
}
