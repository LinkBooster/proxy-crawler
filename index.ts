import { AdvancedProxy, FoxyTool, Hidester } from "./crawlers";

(async () => {
  const hidester = new Hidester();
  const hidesterProxy = await hidester.parse();
  const foxyToolCrawler = new FoxyTool();
  const foxyToolProxiesList = await foxyToolCrawler.parse();
  const advancedProxy = new AdvancedProxy();
  const advancedProxiesList = await advancedProxy.parse();

  let allProxies = foxyToolProxiesList.concat(advancedProxiesList);
  // @ts-ignore
  allProxies = allProxies.concat(hidesterProxy);

  const unique = new Set();
  for (const proxy of allProxies) {
    unique.add(proxy.ip);
  }

  console.log("foxyToolProxiesList : ", foxyToolProxiesList.length);
  console.log("advancedProxiesList : ", advancedProxiesList.length);
  console.log("hidesterProxy : ", hidesterProxy.length);
  console.log("total : ", allProxies.length);
  console.log("unique size : ", unique.size);
})();
