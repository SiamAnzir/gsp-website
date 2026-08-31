import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import mainLogo from "../../assets/gsp.png";
import { NAV_LINKS, BOOKING_URL } from "../../store/site.js";

/**
 * Tracks which section is currently under the header so the nav can highlight it.
 *
 * Uses a negative top margin roughly equal to the fixed header height, which
 * makes "current" mean "the section you are actually reading" rather than
 * "the topmost section touching the viewport".
 */
const useScrollSpy = (ids) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: [0.1, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

const NAV_IDS = NAV_LINKS.map((l) => l.id);

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const active = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#top" className="site-nav__brand">
          <img src={mainLogo} alt="Galacticos Sports Pavilion" height={46} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav className="align-items-lg-center">
            {NAV_LINKS.map((link) => (
              <Nav.Link
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setExpanded(false)}
                className={`site-nav__link ${active === link.id ? "is-active" : ""}`}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </Nav.Link>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="site-nav__cta"
              onClick={() => setExpanded(false)}
            >
              Book a Slot
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopHeader;
