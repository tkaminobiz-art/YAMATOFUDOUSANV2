import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();

page.on("console", (msg) => console.log("[console]", msg.text()));

await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });

const info = await page.evaluate(() => {
  document.querySelectorAll(".scroll-in").forEach((el) => el.classList.add("is-visible"));
  const sections = Array.from(document.querySelectorAll("section")).map((s, i) => {
    const r = s.getBoundingClientRect();
    const h1h2 = s.querySelector("h1, h2");
    return {
      idx: i,
      height: Math.round(r.height),
      top: Math.round(r.top + window.scrollY),
      label: h1h2 ? h1h2.textContent.slice(0, 30) : s.getAttribute("id") || "-",
    };
  });
  return {
    bodyHeight: document.body.scrollHeight,
    windowHeight: window.innerHeight,
    sectionCount: sections.length,
    sections,
  };
});

console.log(JSON.stringify(info, null, 2));

await browser.close();
