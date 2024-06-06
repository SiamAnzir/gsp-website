import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useRef} from "react";
import Lottie from "lottie-web";
import grassAnimation from "../../assets/lottieFiles/grass.json"
import locationAnimation from "../../assets/lottieFiles/location.json";
import sideAnimation from "../../assets/lottieFiles/6side.json"
import juiceBarAnimation from "../../assets/lottieFiles/juice.json"
import allTimeAnimation from "../../assets/lottieFiles/24.json";
import parkingAnimation from "../../assets/lottieFiles/parking2.json";
import dressingAnimation from "../../assets/lottieFiles/dressing.json";
import promotionAnimation from "../../assets/lottieFiles/promotion.json";

const Facilities = () => {
    const locationRef = useRef(null);
    const sideRef = useRef(null);
    const grassRef= useRef(null);
    const juiceBarRef = useRef(null);
    const allTimeRef = useRef(null);
    const parkingRef = useRef(null);
    const dressingRef= useRef(null);
    const promotionRef = useRef(null);

    useEffect(() => {
        const anim1 = Lottie.loadAnimation({
            container: grassRef.current,
            animationData: grassAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        });

        const anim2 = Lottie.loadAnimation({
            container: locationRef.current,
            animationData: locationAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        });

        const anim3 = Lottie.loadAnimation({
            container: sideRef.current,
            animationData: sideAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        })

        const anim4 = Lottie.loadAnimation({
            container: juiceBarRef.current,
            animationData: juiceBarAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        })

        const anim5 = Lottie.loadAnimation({
            container: allTimeRef.current,
            animationData: allTimeAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        });

        const anim6 = Lottie.loadAnimation({
            container: parkingRef.current,
            animationData: parkingAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        });

        const anim7 = Lottie.loadAnimation({
            container: dressingRef.current,
            animationData: dressingAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        })

        const anim8 = Lottie.loadAnimation({
            container: promotionRef.current,
            animationData: promotionAnimation,
            renderer: "svg", // You can choose 'svg', 'canvas', or 'html' based on your preference
            loop: true, // Set to false if you want the animation to play only once
            autoplay: true, // Set to false if you want to manually control the animation
        })

        // To control the animation, you can use methods like anim.play(), anim.pause(), etc.

        return () => {
            anim1.destroy(); // Clean up the animation when the component unmounts
            anim2.destroy();
            anim3.destroy();
            anim4.destroy();
            anim5.destroy(); // Clean up the animation when the component unmounts
            anim6.destroy();
            anim7.destroy();
            anim8.destroy();
        };
    }, []);
    return(
        <section id="facilities" style={{marginTop:"30px"}}>
            <Container>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="header-title">
                        FACILITIES
                    </div>
                    <div className="single-line"></div>
                </div>
                <Row className="my-3 gy-4">
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={grassRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">Fifa Certified Grass</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={locationRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">Convenient Location</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={sideRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">5/6/7 a Side</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={juiceBarRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">Juice Bar</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={allTimeRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">24/7 Open</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={parkingRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">Parking System</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={dressingRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">Dressing Room</p>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{border: "1px solid" , borderRadius:"7px"}}>
                            <div
                                ref={promotionRef}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            ></div>
                            <p className="facilities-title">Open For Promotions</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Facilities