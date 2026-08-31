import { Col, Container, Row } from "react-bootstrap";
import SectionHeading from "../Utils/SectionHeading.jsx";
import LottieBox from "../Utils/LottieBox.jsx";
import Reveal from "../Utils/Reveal.jsx";

const AboutUs = () => (
  <section id="about" className="section">
    <Container>
      <SectionHeading eyebrow="Who we are">About Us</SectionHeading>

      <Row className="align-items-center g-4">
        <Col md={6}>
          <Reveal variant="left" className="d-flex justify-content-center">
            <LottieBox
              load={() => import("../../assets/lottieFiles/aboutUs.json")}
              width="100%"
              height={300}
              className="lottie-box--wide"
            />
          </Reveal>
        </Col>
        <Col md={6}>
          <Reveal variant="right" delay={80}>
            <p className="lead-text">
              Welcome to <strong>Galacticos Sports Pavilion</strong> — your ultimate
              destination for futsal excellence in Diabari, Uttara, Dhaka.
            </p>
            <p className="body-text">
              Join us for thrilling matches, top-notch facilities, and a community
              united by our love for the beautiful game. Step into the arena where
              champions are made and dreams take flight. Let&rsquo;s play, compete, and
              celebrate the spirit of sportsmanship together at GSP.
            </p>
            <p className="tagline">Get, Set &amp; Play.</p>
          </Reveal>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutUs;
