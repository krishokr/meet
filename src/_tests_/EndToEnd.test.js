import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // const browser = await puppeteer.launch();

    // const page = await browser.newPage();
    // await page.goto('http://localhost:3000/');

    // await page.waitForSelector('.event');
    const eventDetailsStyle = await page.evaluate('document.querySelector(".event-details").getAttribute("style")')
    expect(eventDetailsStyle).toStrictEqual('display: none;');
    // browser.close();
  });
  
  test('User can expand an event to see its details', async () => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('http://localhost:3000/');

    // await page.waitForSelector('.event');
    await page.click('.event .toggle-button');

    const eventDetailsStyle = await page.evaluate('document.querySelector(".event-details").getAttribute("style")')
    expect(eventDetailsStyle).toStrictEqual('display: flex;');
    // browser.close();
  });

  test('User can collapse an event to hide its details', async () => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    const eventDetailsStyle = await page.evaluate('document.querySelector(".event-details").getAttribute("style")');
    await page.click('.event .toggle-button');
    expect(eventDetailsStyle).toStrictEqual('display: flex;');
    await page.click('.event .toggle-button');
    expect(eventDetailsStyle).toStrictEqual('display: none;');
  });

   
  
});

// describe('filter events by city', () => {
//   let browser;
//   let page;
//   beforeAll(async () => {
//     jest.setTimeout(3000);
//     browser = await puppeteer.launch({
//       headless: false,
//       slowMo: 250, // slow down by 250ms
//       ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
//     });
//     page = await browser.newPage();
//     await page.goto('http://localhost:3000/');
//     await page.waitForSelector('.event');
//   });

//   afterAll(() => {
//     browser.close();
//   });

//   test('An event element is collapsed by default', async () => {
//     const eventDetails = await page.$('.event .event__Details');
//     expect(eventDetails).toBeNull();
//   });

//   test('User can expand an event to see its details', async () => {
//     await page.click('.event .toggle-button');
//     const eventDetails = await page.$('.event .event__Details');
//     expect(eventDetails).toBeDefined();
//   });

//   test('User can collapse an event to hide its details', async () => {
//     await page.click('.event .details-btn');
//     const eventDetails = await page.$('.event .event__Details');
//     expect(eventDetails).toBeNull();
//   });

//   test('Filter events by city.', async () => {
    
//   })

// });

