import media from "../../store/media.json";

/**
 * Responsive <picture> built from the manifest that scripts/optimize-images.mjs
 * writes. The browser gets a srcset per format and picks one rendition — so the
 * gallery costs roughly 20 KB a tile instead of the ~1 MB original.
 *
 * `sizes` must describe the element's rendered width or the browser guesses the
 * full viewport and downloads a needlessly large file. The default matches the
 * three-column grid the Academy section uses.
 */
const ORDER = ["avif", "webp"];

const Picture = ({
  section,
  name,
  alt,
  sizes = "(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 30vw",
  className = "",
  loading = "lazy",
  // The hero slide is the largest-contentful-paint element and needs "high";
  // everything else can stay at the browser's default.
  fetchPriority,
  decoding = "async",
  ...rest
}) => {
  const entry = media[section]?.find((m) => m.name === name);
  if (!entry) return null;

  const srcset = (format) =>
    entry.sources[format]
      ?.map((s) => `/media/${section}/${s.file} ${s.width}w`)
      .join(", ");

  return (
    <picture className={className} {...rest}>
      {ORDER.map((format) =>
        entry.sources[format]?.length ? (
          <source key={format} type={`image/${format}`} srcSet={srcset(format)} sizes={sizes} />
        ) : null,
      )}
      <img
        src={`/media/${section}/${entry.fallback}`}
        srcSet={srcset("jpg")}
        sizes={sizes}
        // Intrinsic size reserves the box before the file lands, so lazy loading
        // does not make the page jump as the user scrolls.
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
    </picture>
  );
};

export default Picture;
