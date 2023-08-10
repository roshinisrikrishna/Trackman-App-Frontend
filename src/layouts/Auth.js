import React from "react";
import { useLocation, Route, Routes, Navigate, Outlet } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";
import buildingImage from '../assets/img/theme/buildings.jpg';

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${buildingImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
      document.body.style.backgroundPosition = null;
      document.body.style.backgroundRepeat = null;
      document.body.style.backgroundAttachment = null;
      document.body.style.backgroundColor = null;
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
        <div className="header py-7 py-lg-8">
          <Container>
            <div className="header-body text-center"  style={{ marginTop: "80px" }}>
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
           
          </div>
        </div>
        {/* Page content */}
        {/* <div className="content-wrapper">
          <Outlet />
        </div> */}
        <Container className="mt-5 pb-5">
          <Row className="justify-content-center">
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          </Row>
        </Container>
      </div>
      <AuthFooter />
      
    </>
  );
};

export default Auth;