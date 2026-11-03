const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  let executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (!fs.existsSync(executablePath)) {
      executablePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: "new"
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  
  // Wait for specular effect canvas to mount and stabilize
  await new Promise(r => setTimeout(r, 2000));
  
  const screenshotPath = "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\header_fix.png";
  
  // Take screenshot of header element
  const header = await page.$('header > div');
  if (header) {
      await header.screenshot({ path: screenshotPath });
  } else {
      await page.screenshot({ path: screenshotPath });
  }
  
  await browser.close();
  console.log("Screenshot taken at: " + screenshotPath);
})();
