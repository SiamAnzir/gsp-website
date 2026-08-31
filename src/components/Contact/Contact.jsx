import { Suspense, lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamondTurnRight, faPhone, faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "../Utils/SectionHeading.jsx";
import Reveal from "../Utils/Reveal.jsx";
import useInView from "../../hooks/useInView.js";
import {
  ADDRESS,
  DIRECTIONS_URL,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
} from "../../store/site.js";

const MapPanel = lazy(() => import("./MapPanel.jsx"));

const TRAVEL = [
  "5-minute walk from Uttara North metro rail station",
  "4-minute drive from Rupayan City, Uttara",
  "15-minute drive from Mirpur DOHS",
  "7-minute metro ride from Pallabi",
  "10-minute metro ride from Mirpur 10",
  "15-minute metro ride from Agargaon",
  "20-minute metro ride from Farmgate",
  "25-minute metro ride from Shahbag",
];

const Contact = () => {
  // The map only mounts once it nears the viewport, so its chunk is fetched on
  // approach rather than competing with first paint.
  const [mapRef, mapInView] = useInView({ rootMargin: "300px", threshold: 0 });

  return (
    <section id="contact" className="section">
      <Container>
        <SectionHeading eyebrow="Find us">Contact Us</SectionHeading>

        <Row className="g-4 align-items-stretch">
          <Col lg={8}>
            <Reveal variant="up" className="h-100">
              <div ref={mapRef} className="map-shell">
                {mapInView ? (
                  <Suspense fallback={<div className="map-shell__placeholder">Loading map…</div>}>
                    <MapPanel />
                  </Suspense>
                ) : (
                  <div className="map-shell__placeholder" />
                )}
              </div>
            </Reveal>
          </Col>

          <Col lg={4}>
            <Reveal variant="right" delay={80} className="contact-panel h-100">
              <p className="contact-panel__address">{ADDRESS}</p>

              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="cta-button cta-button--ghost"
              >
                Get Directions
                <FontAwesomeIcon icon={faDiamondTurnRight} className="ms-2" />
              </a>

              <h3 className="contact-panel__subtitle">
                <FontAwesomeIcon icon={faTrainSubway} className="me-2" />
                Getting here
              </h3>
              <ul className="contact-panel__list">
                {TRAVEL.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3 className="contact-panel__subtitle">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                Hotline
              </h3>
              <p className="contact-panel__phones">
                <a href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY}</a>
                <a href={`tel:${PHONE_SECONDARY}`}>{PHONE_SECONDARY}</a>
              </p>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
