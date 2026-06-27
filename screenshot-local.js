const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:3100';
const pages = [
  { name: 'home', url: '/' },
  { name: 'consultancy', url: '/consultancy' },
  { name: 'business-development', url: '/business-development' },
  { name: 'about', url: '/about' },
  { name: 'contact', url: '/contact' },
];

(async () => {
  const dir = path.join(__dirname, 'local-screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  for (const p of pages) {
    await page.goto(BASE + p.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, p.name === 'contact' ? 5000 : 1500));
    await page.screenshot({ path: path.join(dir, `${p.name}.png`), fullPage: true });
    console.log(`✓ ${p.name}`);
  }
  await browser.close();
})();
