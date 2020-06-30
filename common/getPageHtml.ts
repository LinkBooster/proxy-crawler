import * as superagent from "superagent";

export async function getHtml(url: string): Promise<string> {
  const response: { text: string } = await superagent.get(url);
  return response.text;
}
