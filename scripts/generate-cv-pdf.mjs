#!/usr/bin/env node
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "downloads");

const CV_FILES = [
  { html: "cv.html", pdf: "nguyen-chi-thanh-cv-vi.pdf" },
  { html: "cv-en.html", pdf: "nguyen-chi-thanh-cv-en.pdf" },
  { html: "cv-ats.html", pdf: "nguyen-chi-thanh-cv-vi-ats.pdf" },
  { html: "cv-ats-en.html", pdf: "nguyen-chi-thanh-cv-en-ats.pdf" },
];

async function generatePDFs() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();

  for (const { html, pdf } of CV_FILES) {
    const htmlPath = path.join(ROOT, "template", html);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`  SKIP: ${html} not found`);
      continue;
    }

    const page = await browser.newPage();

    // Load the HTML file directly via file:// protocol
    await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, {
      waitUntil: "networkidle",
    });

    // Wait a moment for fonts and images to fully render
    await page.waitForTimeout(500);

    const outPath = path.join(OUT_DIR, pdf);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    const size = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`  ✓ ${pdf} (${size} KB)`);
    await page.close();
  }

  await browser.close();
  console.log(`\nAll PDFs saved to: ${OUT_DIR}`);
}

console.log("Generating CV PDFs with Playwright...\n");
generatePDFs().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
