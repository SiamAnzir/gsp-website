import Reveal from "./Reveal.jsx";

/**
 * The shared section title. Replaces the header-title + single-line div pair
 * that every section used to repeat by hand, so spacing and the underline
 * animation stay identical across the page.
 */
const SectionHeading = ({ children, eyebrow }) => (
  <Reveal className="section-heading" variant="up">
    {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
    <h2 className="section-heading__title">{children}</h2>
    <span className="section-heading__rule" aria-hidden="true" />
  </Reveal>
);

export default SectionHeading;
