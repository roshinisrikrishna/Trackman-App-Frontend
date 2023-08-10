import React from "react";
import { useLocation, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { Canvas } from "views/Canvas";
// Import the Canvas component
import routes from "routes.js";
import "./Admin.css";

// ... (other imports and code)

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <div className="admin-layout" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  <Sidebar
    {...props}
    routes={routes}
    logo={{
      innerLink: "/admin",
      imgSrc: require("../assets/img/brand/road_trackman.png"),
      imgAlt: "...",
    }}
  />

  <div className="main-content" ref={mainContent} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
    <AdminNavbar
      {...props}
      brandText={getBrandText(props?.location?.pathname)}
    />
    <div className="content-wrapper" style={{ marginTop: '60px', flex: 1, paddingTop: '10px' }}>
      {/* Use the Canvas component with Outlet as children */}
      <Canvas width={1600} height={900}>
      <div className="outlet-container ml-4" style={{ width: '100%' }}>
        <Outlet />
      </div>

      </Canvas>
    </div>
  </div>
  <Container fluid>
    <AdminFooter />
  </Container>
</div>
  );
};








export default Admin;
