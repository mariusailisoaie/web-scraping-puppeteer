const puppeteer = require('puppeteer');

(async () => {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  await page.goto('https://plan-react-app.firebaseapp.com/signin', {waitUntil: 'networkidle2'});

  await page.waitForSelector('form');
  await page.focus('input[type=email]');
  await page.keyboard.type('test@gmail.com');

  await page.focus('input[type=password]');
  await page.keyboard.type('test123');
  await page.click('button.btn');
  
  await page.waitForSelector('.dashboard.container');
  await page.click('.nav-wrapper ul li a');
  
  await page.waitForSelector('.container');
  await page.focus('input[type=text]');
  await page.keyboard.type('P');
  
  await page.focus('textarea');
  await page.keyboard.type('P');
  await page.screenshot({path: './screenshots/firebaseapp.png', fullPage: true});
  await page.click('button.btn');

  await browser.close();
})();