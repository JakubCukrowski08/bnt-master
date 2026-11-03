const puppeteer = require('puppeteer-core');
const fs = require('fs');

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
  await page.setViewport({ width: 1440, height: 1080 });
  
  try {
    // 1. Strona główna - sekcja realizacje
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => {
        const h = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Dowody'));
        if(h) h.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\realizacje_home_kepa.png" });

    // 2. Strona listy /realizacje
    await page.goto('http://localhost:3001/realizacje', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\realizacje_list_full.png" });
    
    // 3. Podstrona kepa-park
    await page.goto('http://localhost:3001/realizacje/kepa-park', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    // Hero i statystyki
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\kepa_park_hero.png" });
    
    // Zjedź do sekcji Cechy / Galeria
    await page.evaluate(() => {
        window.scrollBy(0, 1500);
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\kepa_park_mid.png" });

  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
