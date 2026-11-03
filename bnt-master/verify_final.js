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
  
  try {
    // 1. TechTag w uslugi-inzynieryjne-budowlane
    await page.goto('http://localhost:3001/uslugi/uslugi-inzynieryjne-budowlane', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => {
        const h = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Dlaczego uprawnienia') || h.textContent.includes('Szczegóły'));
        if(h) h.scrollIntoView({ behavior: 'auto', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\techtag_final.png" });

    // 2. SectionHeader w nadzor-inwestorski
    await page.goto('http://localhost:3001/uslugi/nadzor-inwestorski', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => {
        const h = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Nadzór nad obiektami') || h.textContent.includes('Gotowy na'));
        if(h) {
            h.scrollIntoView({ behavior: 'auto', block: 'center' });
        } else {
            // scroll to any h2 to capture SectionHeader
            const anyH = document.querySelector('h2');
            if (anyH) anyH.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\sectionheader_final.png" });
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
