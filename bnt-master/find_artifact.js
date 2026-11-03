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
    
    const elementsWithPipe = await page.evaluate(() => {
      const result = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while(node = walker.nextNode()) {
        if (node.nodeValue.includes('||')) {
          result.push({
            text: node.nodeValue.trim(),
            parentHTML: node.parentElement.outerHTML.substring(0, 200)
          });
        }
      }
      return result;
    });
    
    console.log("TEXT NODES WITH ||:", elementsWithPipe);

    // Let's also check for any absolute/fixed elements that might look like it
    const weirdElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const suspicious = [];
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.content && style.content.includes('||')) {
                suspicious.push({ tag: el.tagName, class: el.className, content: style.content });
            }
        });
        return suspicious;
    });
    console.log("CSS CONTENT WITH ||:", weirdElements);

  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
