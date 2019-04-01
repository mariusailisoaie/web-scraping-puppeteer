const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://addictedcoder.com/');
  await page.screenshot({path: './screenshots/myPage.png'});

  await browser.close();
})();