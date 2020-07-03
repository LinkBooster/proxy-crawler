import * as fs from "fs";

import {
  advancedProxyAdapter,
  foxyToolAdapter,
  hidesterAdapter,
} from "./adapters";
import { AdvancedProxy, FoxyTool, Hidester } from "./crawlers";
import { IProxyData } from "./interfaces/ProxyData";
(async () => {
  const foxyToolCrawler = new FoxyTool();
  const advancedProxy = new AdvancedProxy();
  const hidester = new Hidester();

  const foxyToolProxiesList = await foxyToolCrawler.parse();
  console.log("foxyToolProxiesList : ", foxyToolProxiesList.length);

  const adaptedFoxyToolProxies = foxyToolAdapter(foxyToolProxiesList);
  console.log("adaptedFoxyToolProxies : ", adaptedFoxyToolProxies.length);

  const advancedProxiesList = await advancedProxy.parse();
  console.log("advancedProxiesList : ", advancedProxiesList.length);

  const adaptedAdvancedProxies = advancedProxyAdapter(advancedProxiesList);
  console.log("adaptedAdvancedProxies : ", adaptedAdvancedProxies.length);

  const hidesterProxy = await hidester.parse();
  console.log("hidesterProxy : ", hidesterProxy.length);

  const adaptedHidesterProxies = hidesterAdapter(hidesterProxy);
  console.log("adaptedHidesterProxies : ", adaptedHidesterProxies.length);

  let allProxies = adaptedFoxyToolProxies.concat(adaptedAdvancedProxies);
  allProxies = allProxies.concat(adaptedHidesterProxies);
  console.log("allProxies : ", allProxies.length);

  const uniqueProxies: IProxyData[] = [];
  const unique = new Set();

  for (const proxy of allProxies) {
    if (unique.has(proxy.ip)) {
      continue;
    }
    uniqueProxies.push(proxy);
    unique.add(proxy.ip);
  }

  console.log("total : ", uniqueProxies.length);
  fs.writeFileSync("data.json", JSON.stringify(uniqueProxies, null, 2));
  // console.log("unique size : ", unique.size);
})();
