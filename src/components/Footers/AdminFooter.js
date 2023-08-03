import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer py-1">
      <Container>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted ml-9">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              Trackman
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink rel="noopener noreferrer" target="_blank">
                Trackman
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink rel="noopener noreferrer" target="_blank">
                About Us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink rel="noopener noreferrer" target="_blank">
                Blog
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink rel="noopener noreferrer" target="_blank">
                MIT License
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      </Container>

    </footer>
  );
};

export default Footer;
