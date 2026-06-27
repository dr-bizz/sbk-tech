const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const PAGES = [
  { name: 'home', url: 'https://southbrook-tech.com/' },
  { name: 'consultancy', url: 'https://southbrook-tech.com/consultancy/' },
  { name: 'business-development', url: 'https://southbrook-tech.com/business-development/' },
  { name: 'about', url: 'https://southbrook-tech.com/about/' },
  { name: 'contact', url: 'https://southbrook-tech.com/contact/' },
];

const OUT = path.join(__dirname, 'scrape-data');
const IMG = path.join(__dirname, 'public', 'images');

function download(url, dest) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    mod
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          return download(res.headers.location, dest).then(resolve);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          console.log(`  ! ${res.statusCode} ${url}`);
          return resolve(false);
        }
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(true)));
      })
      .on('error', (e) => {
        file.close();
        fs.unlink(dest, () => {});
        console.log(`  ! err ${url}: ${e.message}`);
        resolve(false);
      });
  });
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  if (!fs.existsSync(IMG)) fs.mkdirSync(IMG, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  const allImages = new Set();

  for (const p of PAGES) {
    console.log(`\n=== ${p.name} ===`);
    await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));

    const data = await page.evaluate(() => {
      const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

      // collect images with their natural dimensions + context
      const imgs = Array.from(document.querySelectorAll('img'))
        .map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.alt,
          w: img.naturalWidth,
          h: img.naturalHeight,
          dispW: Math.round(img.getBoundingClientRect().width),
          dispH: Math.round(img.getBoundingClientRect().height),
        }))
        .filter((i) => i.src && !i.src.startsWith('data:'));

      // background images
      const bgs = [];
      document.querySelectorAll('*').forEach((el) => {
        const bg = getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none' && bg.includes('url(')) {
          const m = bg.match(/url\(["']?(.*?)["']?\)/);
          if (m && !m[1].startsWith('data:')) bgs.push(m[1]);
        }
      });

      // body / heading styles
      const bodyStyle = getComputedStyle(document.body);
      const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h) => {
        const c = getComputedStyle(h);
        return {
          tag: h.tagName,
          text: clean(h.textContent),
          fontSize: c.fontSize,
          fontWeight: c.fontWeight,
          fontFamily: c.fontFamily,
          color: c.color,
          lineHeight: c.lineHeight,
          letterSpacing: c.letterSpacing,
          textTransform: c.textTransform,
          marginTop: c.marginTop,
          marginBottom: c.marginBottom,
        };
      });

      // links in nav
      const navLinks = Array.from(document.querySelectorAll('nav a, header a, .menu a')).map((a) => ({
        text: clean(a.textContent),
        href: a.href,
      }));

      // full visible text
      const text = clean(document.body.innerText);

      // section background colors (top-level sections)
      const sections = Array.from(document.querySelectorAll('section, .elementor-section, footer, header')).slice(0, 40).map((s) => {
        const c = getComputedStyle(s);
        const r = s.getBoundingClientRect();
        return {
          cls: s.className.toString().slice(0, 80),
          bg: c.backgroundColor,
          color: c.color,
          padding: c.padding,
          top: Math.round(r.top + window.scrollY),
          height: Math.round(r.height),
        };
      });

      return {
        title: document.title,
        bodyFont: bodyStyle.fontFamily,
        bodyColor: bodyStyle.color,
        bodyBg: bodyStyle.backgroundColor,
        bodyFontSize: bodyStyle.fontSize,
        imgs,
        bgs,
        headings,
        navLinks,
        sections,
        text,
        fullHeight: document.body.scrollHeight,
      };
    });

    fs.writeFileSync(path.join(OUT, `${p.name}.json`), JSON.stringify(data, null, 2));
    fs.writeFileSync(path.join(OUT, `${p.name}.html`), await page.content());

    data.imgs.forEach((i) => allImages.add(i.src));
    data.bgs.forEach((b) => allImages.add(b));
    console.log(`  ${data.imgs.length} imgs, ${data.bgs.length} bg, ${data.text.length} chars text`);
  }

  await browser.close();

  // download all images
  console.log(`\n=== downloading ${allImages.size} images ===`);
  const manifest = [];
  for (const url of allImages) {
    try {
      const u = new URL(url);
      let base = path.basename(u.pathname);
      if (!base || !path.extname(base)) continue;
      // strip wp resize suffixes like -300x200 to keep clean names but avoid collisions
      const dest = path.join(IMG, base);
      const ok = await download(url, dest);
      if (ok) {
        manifest.push({ url, file: `images/${base}`, size: fs.statSync(dest).size });
        console.log(`  ✓ ${base}`);
      }
    } catch (e) {
      console.log(`  ! ${url}: ${e.message}`);
    }
  }
  fs.writeFileSync(path.join(OUT, 'image-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${manifest.length} images saved to public/images/`);
})();
