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
  
  // Set viewport to mobile to force text wrapping
  await page.setViewport({ width: 375, height: 812 });
  
  // The service slug for 'uslugi-inzynieryjne-budowlane' contains this darkSection
  await page.goto('http://localhost:3001/uslugi/uslugi-inzynieryjne-budowlane', { waitUntil: 'networkidle0' });
  
  // Scroll down to trigger the ScrollFloat animation
  await page.evaluate(async () => {
      // Find the element containing "Kompetencje konstrukcyjno-budowlane"
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const target = headings.find(h => h.textContent.includes('Kompetencje konstrukcyjno-budowlane'));
      if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
  });

  // Wait for animation to finish
  await new Promise(r => setTimeout(r, 2000));
  
  const screenshotPath = "C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\kompetencje_fix.png";
  
  await page.screenshot({ path: screenshotPath });
  
  // Audit script to check all ScrollFloat instances across a few key pages
  const urlsToTest = [
      'http://localhost:3001/',
      'http://localhost:3001/uslugi',
      'http://localhost:3001/uslugi/uslugi-inzynieryjne-budowlane'
  ];
  const viewports = [375, 768, 1440];
  let auditPassed = true;
  let auditLog = "";

  for (const url of urlsToTest) {
      await page.goto(url, { waitUntil: 'networkidle0' });
      for (const w of viewports) {
          await page.setViewport({ width: w, height: 900 });
          await new Promise(r => setTimeout(r, 1000)); // wait for layout
          
          const wordsWrapCheck = await page.evaluate(() => {
              const words = Array.from(document.querySelectorAll('.scroll-float-word'));
              let brokenWords = 0;
              words.forEach(word => {
                  const chars = Array.from(word.querySelectorAll('.char'));
                  if (chars.length > 1) {
                      const firstCharTop = chars[0].getBoundingClientRect().top;
                      const lastCharTop = chars[chars.length - 1].getBoundingClientRect().top;
                      // if chars are on different lines, their top positions will differ significantly
                      if (Math.abs(firstCharTop - lastCharTop) > 5) {
                          brokenWords++;
                      }
                  }
              });
              return { totalWords: words.length, brokenWords };
          });
          
          auditLog += `URL: ${url} | Viewport: ${w}px | Checked: ${wordsWrapCheck.totalWords} words | Broken: ${wordsWrapCheck.brokenWords}\n`;
          if (wordsWrapCheck.brokenWords > 0) {
              auditPassed = false;
          }
      }
  }

  fs.writeFileSync("C:\\Users\\micuk\\.gemini\\antigravity-ide\\brain\\9e52e20f-afe5-47c9-8610-e3da65efa1e9\\audit_log.txt", auditLog);
  console.log("Audit complete. Passed: " + auditPassed);
  
  await browser.close();
})();
