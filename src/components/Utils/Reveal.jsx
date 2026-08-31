import useInView from "../../hooks/useInView.js";

/**
 * Fades content in as it scrolls into view.
 *
 * The motion itself is pure CSS (see the .reveal rules in App.css) — this only
 * flips a class, so it adds no animation library to the bundle. `delay` staggers
 * siblings; keep the steps small (60-90ms) or a grid feels sluggish to load.
 */
const Reveal = ({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) => {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
