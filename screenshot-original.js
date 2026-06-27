const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });
  
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'original-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }
  
  const pages = [
    { name: 'home', url: 'https://southbrook-tech.com/' },
    { name: 'consultancy', url: 'https://southbrook-tech.com/consultancy' },
    { name: 'business-development', url: 'https://southbrook-tech.com/business-development' },
    { name: 'about', url: 'https://southbrook-tech.com/about' },
    { name: 'contact', url: 'https://southbrook-tech.com/contact' }
  ];
  
  for (const pageInfo of pages) {
    try {
      console.log(`Capturing screenshot of ${pageInfo.name} page...`);
      await page.goto(pageInfo.url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait a bit more for any animations or late-loading content
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Take full page screenshot
      await page.screenshot({ 
        path: path.join(screenshotsDir, `${pageInfo.name}.png`),
        fullPage: true 
      });
      
      console.log(`✓ Screenshot saved: ${pageInfo.name}.png`);
    } catch (error) {
      console.error(`Error capturing ${pageInfo.name}: ${error.message}`);
    }
  }
  
  await browser.close();
  console.log('All screenshots captured successfully!');
}

captureScreenshots().catch(console.error);