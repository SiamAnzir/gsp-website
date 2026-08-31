/**
 * Generates responsive web derivatives from the original photos.
 *
 * Sources live in src/assets/_originals/<section>/ and are never shipped.
 * Output goes to public/media/<section>/ so Vite copies it verbatim: the files
 * stay out of the JS bundle and out of the hashed-asset churn, which means a
 * redeploy only re-uploads code, not megabytes of photos.
 *
 * Filenames are slugified (spaces break more web servers than they should) and
 * carry their width, so replacing a photo means writing a new name — that is
 * the cache-busting story for the long TTL that .htaccess puts on /media/.
 *
 *   npm run optimize:images
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "src/assets/_originals");
const OUT = path.join(root, "public/media");

const WIDTHS = [400, 800, 1200];
const IMAGE_RE = /\.(jpe?g|png|tiff?|webp)$/i;

// Re-encoding is slow (tens of minutes over a large set), so existing outputs
// are left alone. Pass --force to rebuild everything.
const FORCE = process.argv.includes("--force");

// AVIF wins ~30% over WebP but costs real encode time; both ship, the browser
// picks. JPEG is only the fallback for browsers that support neither — a
// sliver of traffic — so it ships at one middling width instead of three.
// That alone was 5 MB of the output directory.
const ENCODERS = {
  avif: { widths: WIDTHS, encode: (img) => img.avif({ quality: 58, effort: 5 }) },
  webp: { widths: WIDTHS, encode: (img) => img.webp({ quality: 76 }) },
  jpg: {
    widths: [800],
    encode: (img) => img.jpeg({ quality: 80, mozjpeg: true, progressive: true }),
  },
};

const slug = (name) =>
  path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/**
 * Which widths to emit for a source, never upscaling.
 *
 * A 760px original would otherwise stop at the 400px step — every larger step
 * is skipped — and get displayed at ~1100px as a blurry 400px file. So when the
 * source is smaller than the largest step, its own native width is emitted too.
 */
const targetWidths = (sourceWidth, widths) => {
  const usable = widths.filter((w) => w <= sourceWidth);
  if (usable.length < widths.length && !usable.includes(sourceWidth)) {
    usable.push(sourceWidth);
  }
  return usable;
};

async function processSection(section) {
  const srcDir = path.join(SRC, section);
  const outDir = path.join(OUT, section);

  const files = (await readdir(srcDir)).filter((f) => IMAGE_RE.test(f)).sort();
  // Sibling folders may hold non-image masters (video, say) — don't leave an
  // empty output directory behind for those.
  if (!files.length) return { section, files: 0, srcBytes: 0, outBytes: 0, manifest: [] };
  await mkdir(outDir, { recursive: true });
  const manifest = [];
  let srcBytes = 0;
  let outBytes = 0;

  for (const file of files) {
    const input = path.join(srcDir, file);
    const base = slug(file);
    const meta = await sharp(input).metadata();
    // sharp only fills meta.size for buffer input, so ask the filesystem.
    const originalBytes = (await stat(input)).size;
    srcBytes += originalBytes;

    const entry = { name: base, width: meta.width, height: meta.height, sources: {} };

    for (const [format, { widths, encode }] of Object.entries(ENCODERS)) {
      entry.sources[format] = [];
      for (const width of targetWidths(meta.width, widths)) {
        const outName = `${base}-${width}.${format}`;
        const outPath = path.join(outDir, outName);

        let bytes;
        if (!FORCE && existsSync(outPath)) {
          bytes = (await stat(outPath)).size;
        } else {
          const buf = await encode(
            sharp(input).resize({ width, withoutEnlargement: true }),
          ).toBuffer();
          await writeFile(outPath, buf);
          bytes = buf.length;
        }

        outBytes += bytes;
        entry.sources[format].push({ width, file: outName, bytes });
      }
    }

    // Widest rendition decides the intrinsic ratio the layout reserves space with.
    const widest = entry.sources.jpg.at(-1);
    entry.ratio = +(meta.width / meta.height).toFixed(4);
    entry.fallback = widest?.file ?? null;
    manifest.push(entry);

    console.log(
      `  ${file}  ${kb(originalBytes)} → ${entry.sources.avif
        .map((s) => `${s.width}px ${kb(s.bytes)}`)
        .join(", ")} (avif)`,
    );
  }

  return { section, files: files.length, srcBytes, outBytes, manifest };
}

const sections = existsSync(SRC)
  ? (await readdir(SRC, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

if (!sections.length) {
  console.error(`No source folders in ${path.relative(root, SRC)}/`);
  console.error("Drop originals into src/assets/_originals/<section>/ and re-run.");
  process.exit(1);
}

const results = [];
for (const section of sections) {
  console.log(`\n${section}/`);
  const result = await processSection(section);
  // Sibling folders can hold non-image masters (video, say); skip those rather
  // than writing an empty section into the manifest.
  if (result.files) results.push(result);
  else console.log("  no images, skipped");
}

// One manifest, written into src/ so components import it normally at build
// time. It carries intrinsic dimensions, which is what lets <Picture> reserve
// space and avoid the layout shift a lazy-loaded gallery otherwise causes.
await writeFile(
  path.join(root, "src/store/media.json"),
  `${JSON.stringify(
    Object.fromEntries(results.map((r) => [r.section, r.manifest])),
    null,
    2,
  )}\n`,
);

const totalSrc = results.reduce((n, r) => n + r.srcBytes, 0);
const totalOut = results.reduce((n, r) => n + r.outBytes, 0);
console.log(
  `\n${results.reduce((n, r) => n + r.files, 0)} photos: ${kb(totalSrc)} of originals → ` +
    `${kb(totalOut)} across ${WIDTHS.length} widths × ${Object.keys(ENCODERS).length} formats.`,
);
console.log("Browsers download one rendition each, so the real page cost is far lower.\n");
