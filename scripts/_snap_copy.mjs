import { chromium, webkit } from 'playwright';

const targets = [
  { heading: 'これが全部、標準です', name: 'copy-01-standard' },
  { heading: 'やまとがお付き合い', name: 'copy-02-20years' },
  { heading: 'こだわりの自社分譲地', name: 'copy-03-lots' },
];

for (const engine of [{ browser: chromium, tag: 'desk', w: 1440, h: 900, dpr: 1 }, { browser: webkit, tag: 'mob', w: 390, h: 844, dpr: 2 }]) {
  const b = await engine.browser.launch();
  const page = await b.newPage({ viewport: { width: engine.w, height: engine.h }, deviceScaleFactor: engine.dpr });
  await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  for (const t of targets) {
    const y = await page.evaluate((needle) => {
      const el = [...document.querySelectorAll('h2,h3')].find(x => x.textContent && x.textContent.includes(needle));
      return el ? el.getBoundingClientRect().top + window.scrollY - 60 : 0;
    }, t.heading);
    await page.evaluate(py => window.scrollTo(0, py), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `/tmp/yamato-critique-snap/${t.name}-${engine.tag}.png` });
    console.log(`✓ ${t.name}-${engine.tag}`);
  }
  await b.close();
}
