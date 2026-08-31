import { useEffect, useRef, useState } from "react";

/**
 * Reports when an element scrolls into the viewport.
 *
 * Used for both scroll-reveal animation and for deferring heavy work (the map,
 * the Lottie players) until the section is actually about to be seen.
 *
 * `once: true` disconnects after the first hit, so revealed content stays put
 * instead of re-animating every time the user scrolls back past it.
 */
export default function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -80px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Server-render-safe and older-browser-safe: show content rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
