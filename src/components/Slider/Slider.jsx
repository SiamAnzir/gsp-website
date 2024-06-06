import { Carousel, Container } from "react-bootstrap";
import {sliderList} from "../../store/data.js";
import "./Slider.css"

const Slider = () => {
    return (
        <section style={{marginTop:"80px"}}>
            <Container>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mt-5">
                    <Carousel>
                        {sliderList.map((slider) => (
                            <Carousel.Item key={slider.id} interval={3000}>
                                <img
                                    className="d-block w-100"
                                    src={slider.image}
                                    alt={slider.alt}
                                    style={{ maxHeight: "35vw" }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </Container>
        </section>
    );
};

export default Slider;
