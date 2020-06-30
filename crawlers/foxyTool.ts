import * as cheerio from "cheerio";

import { getHtml } from "./../common";

export interface IFoxyToolProxyRowData {
  ip: string;
  port: number;
  country: string;
  pingTime: number;
  lastCheckTime: string;
  type: string;
}

export class FoxyTool {
  public static baseUrl = "http://foxtools.ru/Proxy";
  private html: string;

  public async getNumberOfPages(): Promise<number> {
    if (!this.html) {
      throw Error("Html was not loaded !");
    }

    const $ = cheerio.load(this.html);
    return Number($("div.pager").children().last().text());
  }

  public async parse(): Promise<IFoxyToolProxyRowData[]> {
    await this.loadHtml(FoxyTool.baseUrl);
    const numberOfPages = await this.getNumberOfPages();
    let data: IFoxyToolProxyRowData[] = [];

    for (let page = 1; page <= numberOfPages; page++) {
      await this.loadHtml(`${FoxyTool.baseUrl}?page=${page}`);
      const pageData = await this.parseProxiesFromPage();
      data = data.concat(pageData);
    }

    return data;
  }

  public async parseProxiesFromPage(): Promise<IFoxyToolProxyRowData[]> {
    if (!this.html) {
      throw Error("Html was not loaded !");
    }

    const data: IFoxyToolProxyRowData[] = [];
    const $ = cheerio.load(this.html);

    $("#theProxyList tbody tr").each((_, tr) => {
      try {
        data.push({
          country: $(tr).children().eq(3).text(),
          ip: $(tr).children().eq(1).text(),
          lastCheckTime: $(tr).children().eq(7).text(),
          pingTime: +$(tr).children().eq(6).text(),
          port: +$(tr).children().eq(2).text(),
          type: $(tr).children().eq(5).text().replace(/\W/g, ""),
        });
      } catch (err) {
        console.log("ERROR during parsing page !");
      }
    });

    return data;
  }

  private async loadHtml(url: string): Promise<void> {
    this.html = await getHtml(url);
  }
}
