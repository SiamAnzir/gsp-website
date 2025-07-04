import {Container, Nav, Navbar, NavItem} from "react-bootstrap";
import mainLogo from "../../assets/gsp.png"

const TopHeader = () => {
    return (
        <Navbar className="py-0 text-white" expand="lg" fixed="top" style={{background:"#161617", boxShadow: "0px 8px 7px -7px rgba(0, 0, 0, 0.15)" }}>
            <Container>
                <Nav className="py-0 navbar-brand">
                    <Nav.Link href="/" className="text-white text-decoration-none">
                        <img src={mainLogo} alt="..." height={50} />
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <div style={{}}>
                            <NavItem>
                                {" "}
                                <Nav.Link
                                    href="/"
                                    className="text-white text-decoration-none"
                                >
                                    {" "}
                                    Home
                                </Nav.Link>{" "}
                            </NavItem>
                        </div>
                        {/*<div style={{ paddingRight: "20px" }}></div>*/}
                        <div style={{}}>
                            <NavItem>
                                {" "}
                                <Nav.Link
                                    href="/#about"
                                    className="text-white text-decoration-none"
                                >
                                    {" "}
                                    About{" "}
                                </Nav.Link>{" "}
                            </NavItem>
                        </div>
                        <div style={{}}>
                            <NavItem>
                                {" "}
                                <Nav.Link
                                    href="/#facilities"
                                    className="text-white text-decoration-none"
                                >
                                    {" "}
                                    Facilities{" "}
                                </Nav.Link>{" "}
                            </NavItem>
                        </div>
                        <div style={{}}>
                            <NavItem>
                                {" "}
                                <Nav.Link
                                    href="/#slot_time"
                                    className="text-white text-decoration-none"
                                >
                                    {" "}
                                    Slot Time{" "}
                                </Nav.Link>{" "}
                            </NavItem>
                        </div>
                        {/*<div style={{}}>*/}
                        {/*    <NavItem>*/}
                        {/*        {" "}*/}
                        {/*        <Nav.Link*/}
                        {/*            href="/#contact"*/}
                        {/*            className="text-black text-decoration-none"*/}
                        {/*        >*/}
                        {/*            {" "}*/}
                        {/*            Events{" "}*/}
                        {/*        </Nav.Link>{" "}*/}
                        {/*    </NavItem>*/}
                        {/*</div>*/}
                        <div style={{}}>
                            <NavItem>
                                {" "}
                                <Nav.Link
                                    href="/#academy"
                                    className="text-white text-decoration-none"
                                >
                                    {" "}
                                    Academy{" "}
                                </Nav.Link>{" "}
                            </NavItem>
                        </div>
                        <div style={{}}>
                            <NavItem>
                                {" "}
                                <Nav.Link
                                    href="/#contact"
                                    className="text-white text-decoration-none"
                                >
                                    {" "}
                                    Contact{" "}
                                </Nav.Link>{" "}
                            </NavItem>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopHeader