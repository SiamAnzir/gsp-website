import { useEffect, useRef, useState } from "react";
import useInView from "../../hooks/useInView.js";

/**
 * Renders a Lottie animation, loading both the player and the animation data
 * only once the element nears the viewport.
 *
 * This is the single biggest weight fix on the site. Importing the .json files
 * statically made Vite inline every keyframe into the main JS bundle — one icon
 * alone (parking2.json) was 1.6 MB. Passing a `load` thunk instead keeps each
 * animation in its own lazily-fetched chunk, so the initial page load carries
 * neither the 89 layer objects nor lottie-web itself.
 *
 *   <LottieBox load={() => import("../../assets/lottieFiles/grass.json")} />
 *
 * The box keeps its dimensions before the animation arrives so nothing reflows,
 * and reduced-motion visitors get the first frame held still instead of a loop.
 */
const LottieBox = ({ load, width = "100%", height = 150, className = "", label }) => {
  const containerRef = useRef(null);
  const [wrapperRef, inView] = useInView({ rootMargin: "200px" });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let anim;
    let cancelled = false;

    (async () => {
      try {
        const [{ default: lottie }, data] = await Promise.all([
          import("lottie-web"),
          load(),
        ]);
        if (cancelled || !containerRef.current) return;

        const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        anim = lottie.loadAnimation({
          container: containerRef.current,
          animationData: data.default ?? data,
          renderer: "svg",
          loop: !still,
          autoplay: !still,
        });

        if (still) anim.goToAndStop(0, true);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [inView, load]);

  return (
    <div
      ref={wrapperRef}
      className={`lottie-box ${className}`}
      style={{ width, height }}
      role={label ? "img" : "presentation"}
      aria-label={label}
    >
      {/* Hidden on failure so a broken fetch leaves a clean gap, not a dead box. */}
      {!failed && <div ref={containerRef} className="lottie-box__canvas" />}
    </div>
  );
};

export default LottieBox;
