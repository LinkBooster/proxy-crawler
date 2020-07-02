import puppeteer from "puppeteer";

export async function puppeterGetHtml(url: string): Promise<string> {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto(url, { waitUntil: "networkidle0" });
    const data: string = await page.evaluate(
      // tslint:disable-next-line:trailing-comma
      () => document.querySelector("*").outerHTML
    );

    await browser.close();
    return data;
  } catch (err) {
    console.error("Puppeter error : ", err);
    return "";
  }
}
