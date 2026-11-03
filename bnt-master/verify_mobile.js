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
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  try {
    // Strona główna - Hero
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Zrzut ekranu od razu na Hero, żeby złapać nagłówek i Header
    await new Promise(r => setTimeout(r, 2500)); // wait for animations
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\mobile_hero.png" });

    // Scroll w dół żeby pokazać że animacje działają
    await page.evaluate(() => {
        window.scrollBy(0, 800);
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\mobile_scroll.png" });

  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
