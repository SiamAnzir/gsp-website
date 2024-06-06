import {Col, Container, Row} from "react-bootstrap";
import Lottie from "lottie-web";
import aboutAnimation from "../../assets/lottieFiles/aboutUs.json"
import {useEffect, useRef} from "react";

const AboutUs = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: containerRef.current,
            animationData: aboutAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        });

        // To control the animation, you can use methods like anim.play(), anim.pause(), etc.

        return () => {
            anim.destroy(); // Clean up the animation when the component unmounts
        };
    }, []);

    return(
        <section id="about" style={{marginTop:"50px"}}>
            <Container>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="header-title">
                        ABOUT US
                    </div>
                    <div className="single-line"></div>
                </div>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={6}>
                        <div>
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
                        <div>
                            <p className="text-center">
                                Welcome to Galacticos Sports Pavilion (GSP)! Your ultimate destination for Futsal excellence in Diabari, Uttara, Dhaka. The most compatible futsal ground in Dhaka city for visiting. Join us for thrilling matches, top-notch facilities, and a community united by our love for the beautiful game. Step into the arena where champions are made and dreams take flight. Let's play, compete, and celebrate the spirit of sportsmanship together at GSP! So, GET, SET and PLAY.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AboutUs