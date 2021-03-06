const puppeteer = require('puppeteer');
const lib = require('./screenshots/lib');
console.log(lib);

(async () => {
  // let browser = await puppeteer.launch({headless: false, slowMo: 100, args: ['--start-maximized']});
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  await page.goto(lib.string1, {waitUntil: 'networkidle2'});

  await page.waitForSelector('#root > div > div > form > div:nth-child(4) > button');
  const text = await page.$eval('#root > div > div > form > div:nth-child(4) > button', el => el.innerText);
  // console.log(text);

  // const content = await page.content();
  // console.log(content);
  // await page.focus('#email');
  // await page.keyboard.type('test@gmail.com');

  // await page.focus('#password');
  // await page.keyboard.type('test123');
  // await page.click('#root > div > div > form > div:nth-child(4) > button');
  
  // await page.waitForSelector('#root > div > div > div > div.col.sm12.m5.offset-m1 > div > div > div > ul');
  // await page.click('#root > div > nav > div > ul > li:nth-child(1) > a');
  
  // await page.waitForSelector('#root > div > div > form > div:nth-child(3) > button');
  // await page.focus('#title');
  // await page.keyboard.type('Hello');
  
  // await page.focus('#content');
  // await page.keyboard.type('Hello');
  // await page.click('#root > div > div > form > div:nth-child(3) > button');

  // await page.waitForSelector('#root > div > div > div > div.col.sm12.m6 > div');
  // await page.screenshot({path: './screenshots/firebaseapp.png', fullPage: true});

  await browser.close();
})();