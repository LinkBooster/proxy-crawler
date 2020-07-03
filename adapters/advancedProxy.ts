import { IAdvancedProxyRowData } from "../crawlers/advancedProxy";
import { IProxyData } from "../interfaces/ProxyData";

export function advancedProxyAdapter(
  rowData: IAdvancedProxyRowData[]
): IProxyData[] {
  return rowData
    .map((data: IAdvancedProxyRowData) => ({
      ip: data.ip,
      port: data.port,
      type: (data.type || "").toUpperCase(),
      // tslint:disable-next-line: object-literal-sort-keys
      country: (data.country || "").toUpperCase(),
    }))
    .filter(({ type }) => ["HTTP", "HTTPS"].includes(type));
}
