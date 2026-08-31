import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  ADDRESS,
  EMAIL,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  SOCIAL,
} from "../../store/site.js";

const SOCIAL_LINKS = [
  { href: SOCIAL.facebook, icon: faFacebook, label: "Facebook" },
  { href: SOCIAL.whatsapp, icon: faWhatsapp, label: "WhatsApp" },
  { href: SOCIAL.instagram, icon: faInstagram, label: "Instagram" },
  { href: SOCIAL.email, icon: faEnvelope, label: "Email" },
];

const Footer = () => (
  <footer className="site-footer">
    <Container>
      <Row className="g-4">
        <Col lg={4}>
          <h3 className="site-footer__title">Connect With Us</h3>
          <div className="site-footer__social">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                <FontAwesomeIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          <h3 className="site-footer__title">
            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
            Address
          </h3>
          <p className="site-footer__text">{ADDRESS}</p>
        </Col>

        <Col lg={4}>
          <h3 className="site-footer__title">
            <FontAwesomeIcon icon={faPhone} className="me-2" />
            Call Us
          </h3>
          <p className="site-footer__text">
            <a href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY}</a>
            <br />
            <a href={`tel:${PHONE_SECONDARY}`}>{PHONE_SECONDARY}</a>
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </Col>
      </Row>

      <p className="site-footer__legal">
        &copy; {new Date().getFullYear()} Galacticos Sports Pavilion. Get, Set &amp; Play.
      </p>
    </Container>
  </footer>
);

export default Footer;
