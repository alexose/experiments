const puppeteer = require('puppeteer');

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('https://gis.ncdc.noaa.gov/maps/ncei/radar');

  await page.waitForSelector('#geosearch_input');
  await page.type('#geosearch_input', 'josephine county, oregon');
  await page.click('.esri-icon-search');
  await timeout(2000);
  
  await page.evaluate(async () => {
    $('.ui-icon-closethick').click()
    $('div.pulse,div.dot').hide();
    $('#nexradMosaicCal').val('2018/02/01');
    $('#uiCoords').hide();
  });

  for (var c=0; c<30; c++){
    for (var i=0; i<288; i++){
      await page.evaluate(async () => {
        $('#btnPlusFive').click();
      });
      await timeout(2000);
      await page.screenshot({path: `output/screen-${c}-${i}.png`});
    }
  }
  
  await browser.close();
})();
