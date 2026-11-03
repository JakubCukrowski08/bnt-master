const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001');
  await page.waitForTimeout(3000);
  const headerHtml = await page.$eval('header', el => el.outerHTML);
  const fs = require('fs');
  fs.writeFileSync('C:/Users/micuk/bnt_budownictwo/header_dom.html', headerHtml);
  await browser.close();
})();
