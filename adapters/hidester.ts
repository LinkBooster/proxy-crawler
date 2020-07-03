import { IHidesterRowData } from "../crawlers/hidester";
import { IProxyData } from "../interfaces/ProxyData";

export function hidesterAdapter(rowData: IHidesterRowData[]): IProxyData[] {
  return rowData
    .map((data: IHidesterRowData) => ({
      ip: data.ip,
      port: data.port,
      type: (data.type || "").toUpperCase(),
      // tslint:disable-next-line: object-literal-sort-keys
      country: (data.country || "").toUpperCase(),
    }))
    .filter(({ type }) => ["HTTP", "HTTPS"].includes(type));
}
