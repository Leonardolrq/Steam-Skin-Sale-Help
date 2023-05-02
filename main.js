const { app, BrowserWindow } = require('electron')
const puppeteer = require('puppeteer');
const $ = require('cheerio');

// Electron Window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()
})


//var arma = document.getElementById("arma").value;
//var pintura = document.getElementById("pintura").value;
//var condicao = document.getElementById("condicao").value;

seachFor = 'Ak-47 redline guerra'

const url = 'https://steamcommunity.com/market/search?appid=730&q=;

//url = ('https://steamcommunity.com/market/search?appid=730&q='+arma+'+'+pintura+'+'+condicao)
//console.log(url)

//Main
function main(){
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);



    var tax = 0;
    tax = num1*(15/100);

    var totalTrans = num1+tax;

    var totalOp = num2-totalTrans;

    console.log(totalOp)
    document.getElementById('totalOp').value = totalOp;

    console.log(totalTrans)
    document.getElementById('totalTrans').value = totalTrans;
    
    console.log(tax)
    document.getElementById('tax').value = tax;
}
//puppeter
async function configureBrowser() {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector("#findItemsSearchBox")
  await page.type('#findItemsSearchBox',seachFor);
  await Promise.all([
    page.waitForNavigation(),
    await page.click('#findItemsSearchSubmit')
  ])

  await page.click('#findItemsSearchSubmit');
  //console.log('Configbrowser')
  return page;
}
async function checkPrice(page) {

  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);

  $('#result_0',html).each(function(){
  //$('.market_listing_price market_listing_price_with_fee',html).each(function(){
    let dollaprice = $(this).text().trim().replace(/\s+/g, ' ');
  })
}

async function monitor(){
  let page = await configureBrowser();
  await checkPrice(page);
 //console.log('monitor')
 document.getElementById('txtResultado').setAttribute("value", dollaprice);
 process.exit(1);
}


monitor();