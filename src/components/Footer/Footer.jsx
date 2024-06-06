import { Container, Row, Col } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
    return (
        <footer className="footer_primary">
            <Container>
                <Row>
                    <Col lg={4} className="individual_column_first">
                        <p className="fs-5">Connect With Us</p>
                        <div className="social_icon d-flex gap-2" style={{fontSize:"40px"}}>
                            <a href="https://www.facebook.com/profile.php?id=61558750037723"
                               target="_blank"
                               rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faFacebook}/>
                            </a>
                            <a href="https://api.whatsapp.com/send/?phone=%2B8801727437077&text&type=phone_number&app_absent=0"
                               target="_blank"
                               rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faWhatsapp}/>
                            </a>
                            <a href="https://www.instagram.com/galacticos.gsp/"
                               target="_blank"
                               rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faInstagram}/>
                            </a>
                            <a href="mailto:hello@galacticosbd.com"
                               target="_blank"
                               rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </a>
                        </div>
                    </Col>
                    <Col lg={4} className="individual_column_first">
                        <p className="fs-5">Address</p>
                        <div>
                            <p className="text-start">
                                Diyabari Mor, Uttara West of 5 no metro rail pillar, Dhaka 1230
                            </p>
                        </div>
                    </Col>
                    <Col lg={4} className="ps-5 individual_column_first">
                        <p className="fs-5">Call Us </p>
                        <div>
                            <p className="text-start">
                                <FontAwesomeIcon icon={faPhone}/>
                                <a
                                    href="tel:+8801727437077"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "16px",
                                        marginLeft: "7px",
                                        color: "white"
                                    }}
                                >
                                    +8801727437077
                                </a>
                                {" ,"}
                                <a
                                    href="tel:+8801333321801"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "16px",
                                        marginLeft: "7px",
                                        color: "white"
                                    }}
                                >
                                    +8801333321801
                                </a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;