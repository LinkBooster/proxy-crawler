import {
  advancedProxyAdapter,
  foxyToolAdapter,
  hidesterAdapter,
} from "./adapters";
import { AdvancedProxy, FoxyTool, Hidester } from "./crawlers";
import { IProxyData } from "./interfaces/ProxyData";

async function getFoxyToolProxy(): Promise<IProxyData[]> {
  const foxyToolCrawler = new FoxyTool();
  const foxyToolProxiesList = await foxyToolCrawler.parse();
  const adaptedFoxyToolProxies = foxyToolAdapter(foxyToolProxiesList);

  return adaptedFoxyToolProxies;
}

async function getAdvancedProxy(): Promise<IProxyData[]> {
  const advancedProxy = new AdvancedProxy();
  const advancedProxiesList = await advancedProxy.parse();
  const adaptedAdvancedProxies = advancedProxyAdapter(advancedProxiesList);

  return adaptedAdvancedProxies;
}

async function getHidesterProxy(): Promise<IProxyData[]> {
  const hidester = new Hidester();
  const hidesterProxy = await hidester.parse();
  const adaptedHidesterProxies = hidesterAdapter(hidesterProxy);

  return adaptedHidesterProxies;
}

export { getFoxyToolProxy, getAdvancedProxy, getHidesterProxy };
