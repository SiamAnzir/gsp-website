import { Col, Container, Row } from "react-bootstrap";
import SectionHeading from "../Utils/SectionHeading.jsx";
import LottieBox from "../Utils/LottieBox.jsx";
import Reveal from "../Utils/Reveal.jsx";

/**
 * Each `animation` is a thunk, not a static import — that is what keeps the
 * keyframe data out of the main bundle. See LottieBox for the why.
 */
const FACILITIES = [
  { title: "FIFA Certified Grass", animation: () => import("../../assets/lottieFiles/grass.json") },
  { title: "Convenient Location", animation: () => import("../../assets/lottieFiles/location.json") },
  { title: "5 / 6 a Side", animation: () => import("../../assets/lottieFiles/6side.json") },
  { title: "Juice Bar", animation: () => import("../../assets/lottieFiles/juice.json") },
  { title: "Open 24/7", animation: () => import("../../assets/lottieFiles/24.json") },
  { title: "Parking System", animation: () => import("../../assets/lottieFiles/parking2.json") },
  { title: "Dressing Room", animation: () => import("../../assets/lottieFiles/dressing.json") },
  { title: "Open For Promotions", animation: () => import("../../assets/lottieFiles/promotion.json") },
];

const Facilities = () => (
  <section id="facilities" className="section">
    <Container>
      <SectionHeading eyebrow="What you get">Facilities</SectionHeading>

      <Row className="g-3 g-lg-4">
        {FACILITIES.map((facility, i) => (
          <Col key={facility.title} xs={6} lg={3}>
            {/* Stagger runs across the row, not down the column, so the grid
                fills left-to-right the way the eye already scans it. */}
            <Reveal className="facility-card h-100" delay={(i % 4) * 70}>
              <LottieBox
                load={facility.animation}
                width={150}
                height={150}
                className="facility-card__art"
              />
              <p className="facility-card__title">{facility.title}</p>
            </Reveal>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Facilities;
