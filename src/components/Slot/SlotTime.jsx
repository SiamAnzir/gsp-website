import { Col, Container, Row } from "react-bootstrap";
import SectionHeading from "../Utils/SectionHeading.jsx";
import LottieBox from "../Utils/LottieBox.jsx";
import Reveal from "../Utils/Reveal.jsx";
import { BOOKING_URL, SLOT_TIMES } from "../../store/site.js";

const SlotTime = () => (
  <section id="slot_time" className="section">
    <Container>
      <SectionHeading eyebrow="Book a pitch">Slot Time</SectionHeading>

      <Row className="align-items-center g-4">
        <Col lg={5}>
          <Reveal variant="left" className="d-flex justify-content-center">
            <LottieBox
              load={() => import("../../assets/lottieFiles/slotTime.json")}
              width="100%"
              height={300}
              className="lottie-box--wide"
            />
          </Reveal>
        </Col>

        <Col lg={7}>
          <Reveal variant="right" delay={80}>
            <p className="body-text text-center mb-4">
              Ninety-minute slots, right around the clock.
            </p>
            {/* A pill grid instead of two stacked lists: the same 16 slots read
                as a schedule rather than as prose, and it reflows cleanly. */}
            <ul className="slot-grid">
              {SLOT_TIMES.map((slot) => (
                <li key={slot} className="slot-grid__item">
                  {slot}
                </li>
              ))}
            </ul>
          </Reveal>
        </Col>
      </Row>

      <Reveal className="d-flex justify-content-center mt-5" delay={120}>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="cta-button"
        >
          Book Your Slot
        </a>
      </Reveal>
    </Container>
  </section>
);

export default SlotTime;
