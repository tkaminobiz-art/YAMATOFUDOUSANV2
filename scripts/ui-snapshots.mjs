import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const PORT = Number(process.env.UI_PORT || 3000);
const HEADLESS = process.env.UI_HEADLESS !== "false";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForHttpOk(url, { timeoutMs = 60_000 } = {}) {
  const start = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return;
    } catch {
      // ignore
    }
    if (Date.now() - start > timeoutMs) {
      throw new Error(`Timed out waiting for server: ${url}`);
    }
    await sleep(500);
  }
}

function startDevServer(port) {
  const child = spawn(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "dev", "--", "--port", String(port)],
    {
    stdio: "inherit",
    env: { ...process.env, PORT: String(port) },
    },
  );
  return child;
}

async function main() {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = join(process.cwd(), "artifacts", "ui-snapshots", ts);
  await mkdir(outDir, { recursive: true });

  const BASE_URL = `http://localhost:${PORT}`;

  // Prefer an already-running dev server (no extra noise).
  let server = null;
  try {
    await waitForHttpOk(`${BASE_URL}/`, { timeoutMs: 2500 });
  } catch {
    // Start one. If the port is held by a stale/unknown process, this will fail fast.
    server = startDevServer(PORT);
  }
  try {
    await waitForHttpOk(`${BASE_URL}/`, { timeoutMs: 60_000 });

    const browser = await chromium.launch({ headless: HEADLESS });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

    const targets = [
      { name: "home-full", kind: "fullPage" },
      { name: "concept", selector: "#concept" },
      { name: "pricing", selector: "#product" },
      { name: "lots", selector: "#lots" },
      { name: "design", selector: "#design" },
      { name: "standard-quality", selector: "#standard-quality" },
      { name: "guarantee", selector: "#guarantee" },
      { name: "faq", selector: "#faq" },
    ];

    const results = [];

    for (const t of targets) {
      const file = join(outDir, `${t.name}.png`);
      if (t.kind === "fullPage") {
        await page.screenshot({ path: file, fullPage: true });
        results.push({ name: t.name, file, ok: true });
        continue;
      }

      const loc = page.locator(t.selector);
      const count = await loc.count();
      if (!count) {
        results.push({ name: t.name, file, ok: false, reason: `selector not found: ${t.selector}` });
        continue;
      }

      const el = loc.first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await el.screenshot({ path: file });
      results.push({ name: t.name, file, ok: true });
    }

    await writeFile(
      join(outDir, "manifest.json"),
      JSON.stringify({ baseUrl: BASE_URL, port: PORT, createdAt: new Date().toISOString(), results }, null, 2),
    );
    await browser.close();

    const failed = results.filter((r) => !r.ok);
    if (failed.length) {
      console.error("Some snapshots failed:");
      for (const f of failed) console.error(`- ${f.name}: ${f.reason}`);
      process.exitCode = 1;
    } else {
      console.log(`Saved snapshots to: ${outDir}`);
    }
  } finally {
    if (server) server.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

