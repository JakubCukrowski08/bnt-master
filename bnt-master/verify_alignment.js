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
  
  await page.goto('http://localhost:3001/uslugi/uslugi-inzynieryjne-budowlane', { waitUntil: 'networkidle0' });
  
  // Sreenshot Section 3 (Callout)
  await page.evaluate(() => {
      const h = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Dlaczego uprawnienia'));
      if(h) h.scrollIntoView({ behavior: 'auto', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\usluga_sekcja3.png" });

  // Sreenshot Section 4 (Grid)
  await page.evaluate(() => {
      const h = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Nadzór nad obiektami'));
      if(h) h.scrollIntoView({ behavior: 'auto', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\usluga_sekcja4.png" });

  await browser.close();
})();
