import { Carousel, Container } from "react-bootstrap";
import Picture from "../Utils/Picture.jsx";
import { sliderList } from "../../store/data.js";
import { BOOKING_URL } from "../../store/site.js";

/**
 * The headline sits below the carousel rather than on top of it. Several of the
 * slides are promotional graphics with their own text baked into the image, so
 * an overlaid title collided with them on every slide but the first.
 */
const Slider = () => (
  <section id="top" className="hero">
    <Container>
      <div className="hero__frame">
        <Carousel fade indicators controls={false} interval={4500} pause="hover">
          {sliderList.map((slide, i) => (
            <Carousel.Item key={slide.id}>
              <div className="hero__slide">
                <Picture
                  section="slider"
                  name={slide.name}
                  alt={slide.alt}
                  sizes="(min-width: 1400px) 1296px, 92vw"
                  // The first slide is the largest-contentful-paint element, so
                  // it loads eagerly at high priority; the rest can wait.
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  decoding={i === 0 ? "sync" : "async"}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="hero__copy">
        <p className="hero__eyebrow">Diabari · Uttara · Dhaka</p>
        <h1 className="hero__title">
          Galacticos <span>Sports Pavilion</span>
        </h1>
        <p className="hero__tagline">
          FIFA certified grass · 5 &amp; 6-a-side · open 24/7
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="cta-button cta-button--pulse"
        >
          Book Your Slot
        </a>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about section">
        <span />
      </a>
    </Container>
  </section>
);

export default Slider;
