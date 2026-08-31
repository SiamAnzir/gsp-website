/**
 * Shrinks bitmaps embedded inside Lottie JSON files.
 *
 * Some exports (parking2.json was the worst: 1.6 MB) inline their raster layers
 * as base64 PNGs at source resolution — one was 3000x4000 for an icon that
 * renders at 150 CSS pixels. That data has to travel to every visitor who
 * scrolls to the section.
 *
 * The declared asset `w`/`h` are deliberately left untouched: lottie-web sizes
 * the <image> element from those fields, so keeping them while reducing the
 * actual pixel count preserves the layout exactly and only cuts weight.
 *
 *   npm run optimize:lottie
 */
import sharp from "sharp";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(root, "src/assets/lottieFiles");

// These render at 150px, occasionally 300px. 400 leaves headroom for retina
// without paying for resolution nobody can see.
const MAX_EDGE = 400;
const DATA_URI = /^data:image\/(png|jpe?g|webp);base64,/i;

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/**
 * After Effects exports coordinates like 123.45600128173828. Three decimals is
 * far finer than a 150px render can resolve, and dropping the rest removes a
 * large share of the byte count in the purely vector animations.
 */
const PRECISION = 1000;

const round = (node) => {
  if (typeof node === "number") {
    return Number.isInteger(node) ? node : Math.round(node * PRECISION) / PRECISION;
  }
  if (Array.isArray(node)) return node.map(round);
  if (node && typeof node === "object") {
    for (const key of Object.keys(node)) node[key] = round(node[key]);
  }
  return node;
};

const files = (await readdir(DIR)).filter((f) => f.endsWith(".json"));
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const raw = await readFile(full, "utf8");
  const before = Buffer.byteLength(raw);
  totalBefore += before;

  const doc = JSON.parse(raw);
  const assets = Array.isArray(doc.assets) ? doc.assets : [];
  let touched = 0;

  for (const asset of assets) {
    if (typeof asset.p !== "string" || !DATA_URI.test(asset.p)) continue;

    const base64 = asset.p.slice(asset.p.indexOf(",") + 1);
    const buf = Buffer.from(base64, "base64");
    const meta = await sharp(buf).metadata();
    if (Math.max(meta.width, meta.height) <= MAX_EDGE) continue;

    // WebP with alpha: these are cut-out illustrations, so transparency must
    // survive the re-encode or the icons gain black boxes.
    const out = await sharp(buf)
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90 })
      .toBuffer();

    asset.p = `data:image/webp;base64,${out.toString("base64")}`;
    touched += 1;
  }

  // Rounding runs on every file, including the ones with no bitmaps at all —
  // that is where the purely vector animations lose their weight.
  round(doc);

  const next = JSON.stringify(doc);
  const after = Buffer.byteLength(next);

  if (after >= before) {
    totalAfter += before;
    continue;
  }

  await writeFile(full, next);
  totalAfter += after;

  const note = touched ? `, ${touched} bitmaps rescaled` : "";
  console.log(`  ${file}: ${kb(before)} → ${kb(after)}${note}`);
}

console.log(`\nLottie total: ${kb(totalBefore)} → ${kb(totalAfter)}\n`);
