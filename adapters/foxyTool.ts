import { IFoxyToolProxyRowData } from "../crawlers/foxyTool";
import { IProxyData } from "../interfaces/ProxyData";

const getCountry = (input: string): string =>
  input.split("(").pop().slice(0, -1);

export function foxyToolAdapter(
  rowData: IFoxyToolProxyRowData[]
): IProxyData[] {
  return rowData
    .map((data: IFoxyToolProxyRowData) => ({
      ip: data.ip,
      port: data.port,
      type: (data.type || "").toUpperCase(),
      // tslint:disable-next-line: object-literal-sort-keys
      country: (getCountry(data.country) || "").toUpperCase(),
    }))
    .filter(({ type }) => ["HTTP", "HTTPS"].includes(type));
}
