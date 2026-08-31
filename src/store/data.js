/**
 * Hero carousel slides.
 *
 * These are names in the generated media manifest, not imports — the files live
 * in public/media/slider/ and are produced by `npm run optimize:images` from the
 * masters in src/assets/_originals/slider/. Importing them directly used to
 * bundle the raw originals, which put a 13 MB PNG in front of every visitor as
 * the largest-contentful-paint image.
 *
 * Add a slide by dropping the master in and re-running the script; the name is
 * the slugified filename.
 */
export const sliderList = [
  { id: 1, name: "gsp-1", alt: "Galacticos Sports Pavilion futsal pitch" },
  { id: 2, name: "gsp-2", alt: "Players on the pitch at Galacticos Sports Pavilion" },
  { id: 3, name: "gsp-3", alt: "Galacticos Sports Pavilion at dusk" },
  { id: 4, name: "gsp-4", alt: "Galacticos Sports Pavilion facilities" },
];
