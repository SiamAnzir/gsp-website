import { useCallback, useEffect, useRef } from "react";
import Picture from "./Picture.jsx";

/**
 * Full-size viewer for the galleries. Hand-rolled rather than pulled from a
 * package: the whole point of the performance pass was cutting bundle weight,
 * and the behaviour needed here is a few dozen lines.
 *
 * Items are either photos ({ name, alt }) or clips ({ type: "video", src,
 * poster, title }) — one implementation so keyboard and focus handling cannot
 * drift between the two galleries.
 *
 * Keyboard: Escape closes, arrows move. Focus moves to the dialog on open and
 * returns to the thumbnail that opened it on close, so keyboard users are not
 * dumped back at the top of the document.
 */
const Lightbox = ({ section, items, index, onClose, onNavigate, label = "media" }) => {
  const dialogRef = useRef(null);
  const restoreFocusTo = useRef(null);

  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (step) => onNavigate((index + step + items.length) % items.length),
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement;
    dialogRef.current?.focus();

    // The page behind must not scroll while the overlay is up.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose, go]);

  if (!open) return null;

  const isVideo = item.type === "video";
  const single = items.length < 2;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt ?? item.title ?? label}
      tabIndex={-1}
      ref={dialogRef}
      onClick={onClose}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        &times;
      </button>

      {!single && (
        <button
          className="lightbox__nav"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label={`Previous ${label}`}
        >
          &#8249;
        </button>
      )}

      {/* Stop propagation so clicking the media itself does not close it. */}
      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            // Keyed by src so switching clips swaps the element rather than
            // leaving the previous one playing behind the new source.
            key={item.src}
            className="lightbox__video"
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <Picture
            section={section}
            name={item.name}
            alt={item.alt}
            sizes="92vw"
            loading="eager"
            className="lightbox__picture"
          />
        )}

        <p className="lightbox__caption">
          {item.title ?? item.alt}
          {!single && (
            <span className="lightbox__counter">
              {index + 1} / {items.length}
            </span>
          )}
        </p>
      </div>

      {!single && (
        <button
          className="lightbox__nav"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label={`Next ${label}`}
        >
          &#8250;
        </button>
      )}
    </div>
  );
};

export default Lightbox;
