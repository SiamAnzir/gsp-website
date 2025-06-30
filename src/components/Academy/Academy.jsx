import { Col, Container, Image, Row } from "react-bootstrap";
import academyVideo from "../../assets/video/academy.mp4";
import academyImg1 from "../../assets/academy/Post 001.jpg";
import academyImg2 from "../../assets/academy/Post 002.jpg";
import academyImg3 from "../../assets/academy/Post 003.jpg";
import academyImg4 from "../../assets/academy/Post 004.jpg";
import academyImg5 from "../../assets/academy/post 005.jpg";
import "./academy.css";

const Academy = () => {
  return (
    <section id="academy" style={{ marginTop: "50px" }}>
      <Container>
        <div className="d-flex align-items-center justify-content-center">
          <div className="header-title">Galacticos Sports Academy (GSA)</div>
          <div className="single-line"></div>
        </div>
        <Row className="mt-2 mt-md-5 d-flex justify-content-center align-items-center g-3">
          <Col md={6}>
            <div>
              <p className="text-center">
                <b>{"Galacticos Sports Academy (GSA)"}</b>
                {
                  " is a dedicated training center focused on enhancing players Futsal skills. With experienced coaches, the academy offers structured programs aimed at improving technical abilities, tactical awareness, and overall athletic performance. Whether for beginners or advanced players, Galacticos Sports Academy provides a supportive environment to help individuals reach their full potential in Futsal."
                }
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div style={{ width: "100%", height: "300px" }}>
              <video
                width="100%"
                height="100%"
                controls
                style={{
                  background: "black",
                  border: "1px solid #0463b3",
                  borderRadius: "3px",
                }}
              >
                <source src={academyVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Col>
        </Row>
        {/*<Carousel controls={false}>*/}
        {/*    <Carousel.Item interval={3000}>*/}
        {/*        <img*/}
        {/*            className="d-block w-100"*/}
        {/*            src={academyImg1}*/}
        {/*            alt="academyImg1"*/}
        {/*            style={{maxHeight: "35vw"}}*/}
        {/*        />*/}
        {/*    </Carousel.Item>*/}
        {/*    <Carousel.Item interval={3000}>*/}
        {/*        <video className="d-block w-100" controls style={{background: "black",maxHeight: "35vw"}}>*/}
        {/*            <source src={academyVideo} type="video/mp4"/>*/}
        {/*            Your browser does not support the video tag.*/}
        {/*        </video>*/}
        {/*    </Carousel.Item>*/}
        {/*</Carousel>*/}
        <Row className="mt-4 d-flex justify-content-center align-items-center g-3">
          <Col md={4}>
            <Image
              src={academyImg1}
              alt="academyImg1"
              className="img-fluid rounded-2"
            />
          </Col>
          <Col md={4}>
            <Image
              src={academyImg2}
              alt="academyImg2"
              className="img-fluid rounded-2"
            />
          </Col>
          <Col md={4}>
            <Image
              src={academyImg3}
              alt="academyImg3"
              className="img-fluid rounded-2"
            />
          </Col>
          <Col md={4}>
            <Image
              src={academyImg4}
              alt="academyImg4"
              className="img-fluid rounded-2"
            />
          </Col>
          <Col md={4}>
            <Image
              src={academyImg5}
              alt="academyImg5"
              className="img-fluid rounded-2"
            />
          </Col>
          <Col md={4}>
            <div className="d-flex justify-content-center">
              <button
                className="px-4 py-3"
                style={{
                  background: "#0463b3",
                  border: "0px",
                  borderRadius: "5px",
                  fontSize: "20px",
                  fontWeight: "600",
                  // animationName: "shopBtn",
                  // animationDuration: "1.5s",
                  // animationIterationCount: "infinite",
                }}
              >
                <i className="animation"></i>
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B8801727437077&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Register Now
                </a>
                <i className="animation"></i>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Academy;
