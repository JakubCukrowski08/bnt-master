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
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    
    // Screenshot of fixed header
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\header_mobile.png" });

    // Open menu
    await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Toggle menu"]');
        if (btn) btn.click();
    });
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\menu_opened.png" });

    // Tap first link
    await page.evaluate(() => {
        const link = document.querySelector('.menu__item-link');
        if (link) link.click();
    });
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\menu_tapped.png" });


  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
