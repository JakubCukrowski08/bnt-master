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
    
    // Scroll to trust bar
    await page.evaluate(() => {
        const trustBar = document.querySelector('section.bg-brand-surface.overflow-hidden');
        if(trustBar) trustBar.scrollIntoView({ behavior: 'auto', block: 'center' });
    });
    
    await new Promise(r => setTimeout(r, 2000));
    const arg = process.argv[2] || 'after';
    await page.screenshot({ path: `C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\trustbar_${arg}.png` });

  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
