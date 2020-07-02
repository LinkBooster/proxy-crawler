import * as cheerio from "cheerio";
import { puppeterGetHtml } from "../common/puppeterPageHtml";
import { ICrawler } from "./crawlerInterfaces";

export interface IAdvancedProxyRowData {
  ip: string;
  port: number;
  country: string;
  pingTime: number;
  lastCheckTime: string;
  type: string;
  speed: string;
}

export class AdvancedProxy implements ICrawler {
  public baseUrl = "https://advanced.name/freeproxy?type=https";
  private html: string;

  public async getNumberOfPages(): Promise<any> {
    if (!this.html) {
      throw Error("Html was not loaded !");
    }

    const $ = cheerio.load(this.html);
    return $("ul.pagination").children().length - 2;
  }

  public async parse(): Promise<IAdvancedProxyRowData[]> {
    await this.loadHtml(this.baseUrl);
    const numberOfPages = await this.getNumberOfPages();
    let data: IAdvancedProxyRowData[] = [];
    for (let page = 1; page <= numberOfPages; page++) {
      await this.loadHtml(`${this.baseUrl}&page=${page}`);
      const pageData = await this.parseProxiesFromPage();
      data = data.concat(pageData);
    }

    return data;
  }

  public async parseProxiesFromPage(): Promise<IAdvancedProxyRowData[]> {
    if (!this.html) {
      throw Error("Html was not loaded !");
    }

    const data: any = [];
    const $ = cheerio.load(this.html);

    $("#table_proxies tbody tr").each((_, tr) => {
      try {
        data.push({
          ip: $(tr).children().eq(1).text(),
          port: +$(tr).children().eq(2).text(),
          type: "HTTPS",
          // tslint:disable-next-line: object-literal-sort-keys
          country: $(tr).children().eq(4).children().eq(1).text(),
          speed: +$(tr).children().eq(5).text(),
          lastCheckTime: $(tr).children().eq(6).text(),
        });
      } catch (err) {
        console.log("ERROR during parsing page !");
      }
    });

    return data;
  }

  public async loadHtml(url: string): Promise<void> {
    this.html = await puppeterGetHtml(url);
  }
}
