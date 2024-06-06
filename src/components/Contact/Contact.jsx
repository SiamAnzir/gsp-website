import { Container, Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker , Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiamondTurnRight, faPhone} from "@fortawesome/free-solid-svg-icons";
import markerImg from "../../assets/marker.png"

const Contact = () => {
    const position = [23.875024,90.366943];

    const markerIcon = new L.Icon({
        iconUrl: markerImg,
        iconRetinaUrl: markerImg,
        iconSize: [40, 40],
        iconAnchor: [17, 46], //[left/rht, top/bottom]
        popupAnchor: [0, -46], //[left/right, top/bottom]
    });

    return (
        <section id="contact" className="mt-5">
            <Container>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="header-title">
                        CONTACT US
                    </div>
                    <div className="single-line"></div>
                </div>
            </Container>
            <Container>
                <Row className="my-3 d-flex justify-content-center align-items-center">
                    <Col md={12} lg={9}>
                        <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={markerIcon}>
                                <Popup> Diyabari Mor, Uttara West of 5 no metro rail pillar, Dhaka 1230 <a href="https://maps.app.goo.gl/ycjZrnznTU8zuAWM7" target="_blank" style={{color:"blue", fontWeight:"600"}}>Get Directions</a> </Popup>
                            </Marker>
                        </MapContainer>
                    </Col>
                    <Col md={12} lg={3}>
                        <p>
                            <a href="https://maps.app.goo.gl/ycjZrnznTU8zuAWM7" target="_blank"
                               style={{ fontWeight: "600"}}>
                                Get Directions
                                <FontAwesomeIcon icon={faDiamondTurnRight} style={{paddingLeft: ".5rem"}}/>
                            </a>
                        </p>
                        <ul style={{fontSize: "14px"}}>
                            <li>
                                5-minute walk from the North Metro Rail station of Uttara.
                            </li>
                            <li>
                                4-minute driving distance from Rupayan city, Uttara.
                            </li>
                            <li>
                                15-minute driving distance from Mirpur Dohs.
                            </li>
                            <li>
                                25-minute Metro rail ride from Shahbag.
                            </li>
                            <li>
                                20-minute Metro Rail ride from Farmgate.
                            </li>
                            <li>
                                15-minute Metro Rail ride from Agargaon
                            </li>
                            <li>
                                10-minute Metro Rail ride from Mirpur 10.
                            </li>
                            <li>
                                7-minute Metro Rail ride from Pallabi.
                            </li>
                        </ul>
                        <p style={{ fontWeight: "600", textDecoration: "none"}}>
                            <span style={{color:"#0463b3",textDecoration:"underline"}}>
                                <FontAwesomeIcon icon={faPhone} style={{paddingRight: ".5rem"}}/>
                                Hotline:
                            </span>
                            <a
                                href="tel:+8801727437077"
                                style={{
                                    textDecoration: "none",
                                    fontSize: "16px",
                                    marginLeft: "7px",
                                    color:"black"
                                }}
                            >
                                +8801727437077
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;
