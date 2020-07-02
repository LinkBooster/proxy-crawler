import * as superagent from "superagent";

export interface IHidesterRowData {
  ip: string;
  port: number;
  country: string;
  pingTime: number;
  lastCheckTime: number;
  type: string;
}

export class Hidester {
  public baseUrl =
    // tslint:disable-next-line:max-line-length
    "https://hidester.com/proxydata/php/data.php?mykey=data&limit=10&orderBy=latest_check&sortOrder=DESC&country=&port=&type=undefined&anonymity=undefined&ping=undefined&gproxy=2";
  private html: string;

  public async parse(): Promise<IHidesterRowData[]> {
    let data: IHidesterRowData[] = [];
    let isEmptyResponse = false;
    let offset = 0;

    while (!isEmptyResponse) {
      try {
        const proxies = await this.getData(offset);
        data = data.concat(proxies);
        isEmptyResponse = proxies.length === 0;
        offset += 1;
      } catch (err) {
        isEmptyResponse = true;
      }
    }

    return data;
  }

  public async getData(offset: number): Promise<IHidesterRowData[]> {
    const { text } = await superagent
      .get(`${this.baseUrl}&offset=${offset}`)
      .set("referer", "https://hidester.com/proxylist/")
      .set("authority", "hidester.com")
      .set(
        "user-agent",
        // tslint:disable-next-line:max-line-length
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
      );

    return JSON.parse(text).map((proxyData: { [key: string]: any }) => ({
      ip: proxyData.IP,
      port: proxyData.PORT,
      // tslint:disable-next-line:object-literal-sort-keys
      country: proxyData.country,
      type: proxyData.type,
      pingTime: proxyData.ping,
      lastCheckTime: proxyData.connection_delay,
    }));
  }
}
