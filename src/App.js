import React from "react";
import {
  createBrowserRouter,
  Route,
  Routes,
  Navigate,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Home from "views/Home";
import Profile from "views/examples/Profile";
import Tables from "views/examples/Tables";
import Login from "views/examples/Login";
import Register from "views/examples/Register";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="user-profile" element={<Profile />} />
        <Route path="tables" element={<Tables />} />
      </Route>
      <Route path="auth/*" element={<AuthLayout />}>
        {/* Redirect all paths under /auth to /auth/login */}
        {/* <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />

      {/* Redirect the root path to /admin/dashboard */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
