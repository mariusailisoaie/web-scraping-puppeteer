const puppeteer = require('puppeteer');
const lib = require('./screenshots/lib');
const moment = require('moment');

(async () => {
  let browser = await puppeteer.launch({headless: false, args: ['--start-maximized']});
  // let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  await page.goto(lib.string2, {waitUntil: 'networkidle2'});

  await page.waitForSelector('#app-body > main > section > div > div > div > div > form > div.form-list.button-list > div > button');
  await page.focus(lib.string3);
  await page.keyboard.type(lib.string4);

  await page.focus(lib.string5);
  await page.keyboard.type(lib.counter);

  await page.click('#app-body > main > section > div > div > div > div > form > div.form-list.button-list > div > button');
  
  await page.waitForSelector("#app-body > main > section.banner-controls-section.site-section.bg-dark > div");

  await page.goto(lib.string6, {waitUntil: 'networkidle2'});

  await page.waitForSelector('#panel-395-1-0-0 > div > ul > li:nth-child(2) > ul > li > ul > li:nth-child(28)');
  const docsNo = await page.evaluate(() => {
    document.querySelector('#panel-395-1-0-0 > div > ul > li:nth-child(2) > ul').style.display = 'block';
    document.querySelector('#panel-395-1-0-0 > div > ul > li:nth-child(2) > ul > li > ul').style.display = 'block';
    return docNumber = Array.from(document.querySelectorAll('#panel-395-1-0-0 > div > ul > li:nth-child(2) > ul > li > ul')[0].children).map(li => li.innerHTML.split("'")[1]);
  });

  const minutesArray = [];

  for (let i = 0; i < docsNo.length; i++) {
    await page.goto(`${lib.string7}${docsNo[i]}`, {waitUntil: 'domcontentloaded'});
    let time = await page.$eval('body > div > table > tbody > tr:nth-child(9) > td > table > tbody > tr:nth-child(2) > td:nth-child(1)', el => el.innerText);
    time = time.split(' ')[6];
    const timeAsMinutes = moment.duration(time, 'm').asMinutes();
    minutesArray.push(timeAsMinutes);
  }
  console.log(minutesArray);
  console.log('minutesArray.length -> ', minutesArray.length);
  console.log('total minutes ->', minutesArray.reduce((a, b) => a + b));
  console.log('time as hours ->', minutesArray.reduce((a, b) => a + b) / 60);

  // await page.waitFor(500);
  // await page.screenshot({path: './screenshots/omdeler.png', fullPage: true});

  await browser.close();
})();