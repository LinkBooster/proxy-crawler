import { FoxyTool } from "./crawlers";

(async () => {
  const foxyToolCrawler = new FoxyTool();
  const data = await foxyToolCrawler.parse();
  console.log("data : ", data);
})();
