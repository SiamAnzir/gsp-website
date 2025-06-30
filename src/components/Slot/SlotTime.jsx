import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import slotTimeAnimation from "../../assets/lottieFiles/slotTime.json";

const SlotTime = () => {
  const containerRef = useRef(null);
  //   const message = encodeURIComponent(
  //     "Welcome to Galacticos Sports Pavilion (GSP)"
  //   );
  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: containerRef.current,
      animationData: slotTimeAnimation,
      renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
      loop: true, // Set to false if you want the animation to play only once
      autoplay: true, // Set to false if you want to manually control the animation
    });

    // To control the animation, you can use methods like anim.play(), anim.pause(), etc.

    return () => {
      anim.destroy(); // Clean up the animation when the component unmounts
    };
  }, []);

  return (
    <section id="slot_time" style={{ marginTop: "70px" }}>
      <Container>
        <div className="d-flex align-items-center justify-content-center">
          <div className="header-title">SLOT TIME</div>
          <div className="single-line"></div>
        </div>
        <Row className="my-3 d-flex justify-content-center align-items-center">
          <Col md={6}>
            <div className="d-flex justify-content-center align-items-center">
              <div
                ref={containerRef}
                style={{
                  maxWidth: "400px",
                  height: "300px",
                }}
              ></div>
            </div>
          </Col>
          <Col md={6}>
            <div
              className="pt-3 card slot-time-card"
              style={{ background: "#f3f6fa" }}
            >
              <div className="p-3 d-flex justify-content-center">
                <ul>
                  <li>06:00AM - 07:30AM</li>
                  <li>07:30AM - 09:00AM</li>
                  <li>09:00AM - 10:30AM</li>
                  <li>10:30AM - 12:00PM</li>
                  <li>12:00PM - 01:30PM</li>
                  <li>01:30PM - 03:00PM</li>
                  <li>03:00PM - 04:30PM</li>
                  <li>04:30PM - 06:00PM</li>
                </ul>
                <ul>
                  <li>06:00PM - 07:30PM</li>
                  <li>07:30PM - 09:00PM</li>
                  <li>09:00PM - 10:30PM</li>
                  <li>10:30PM - 12:00AM</li>
                  <li>12:00AM - 01:30AM</li>
                  <li>01:30AM - 03:00AM</li>
                  <li>03:00AM - 04:30AM</li>
                  <li>04:30AM - 06:00AM</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <button
            className="p-2 slot-button"
            style={{
              background: "#0463b3",
              border: "0px",
              borderRadius: "5px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            <a
              href="https://api.whatsapp.com/send/?phone=%2B8801727437077&text&type=phone_number&app_absent=0"
              // href="https://quiket.me/activities/gsp/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Book Your Slot
            </a>
          </button>
        </Row>
      </Container>
    </section>
  );
};

export default SlotTime;
