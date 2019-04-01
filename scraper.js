const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});
  await page.goto('https://github.com/mariusailisoaie?tab=repositories', {waitUntil: 'networkidle2'});
  // await page.screenshot({path: './screenshots/myPage.png', fullPage: true});
  // const html = await page.content();
  await page.waitForSelector('#user-repositories-list');
  const repoNameArray = await page.evaluate(() => {
    const reposName = Array.from(document.querySelectorAll('#user-repositories-list ul li h3 a'));
    return reposName.map(repoName => repoName.innerText);
  });
  fs.writeFile('repos.txt', repoNameArray, err => {
    if(err) throw err;
    console.log('Repos saved!');
  })

  await browser.close();
})();