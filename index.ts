import { AdvancedProxy, FoxyTool } from "./crawlers";

(async () => {
  const foxyToolCrawler = new FoxyTool();
  const foxyToolProxiesList = await foxyToolCrawler.parse();
  const advancedProxy = new AdvancedProxy();
  const advancedProxiesList = await advancedProxy.parse();

  const allProxies = foxyToolProxiesList.concat(advancedProxiesList);

  const unique = new Set();
  for (const proxy of allProxies) {
    unique.add(proxy.ip);
  }

  console.log("foxyToolProxiesList : ", foxyToolProxiesList.length);
  console.log("advancedProxiesList : ", advancedProxiesList.length);
  console.log("total : ", allProxies.length);
  console.log("unique size : ", unique.size);
})();
