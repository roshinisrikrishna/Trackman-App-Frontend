import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, 
  Route, 
  Routes, 
  Navigate,
  createRoutesFromElements,
  createRoutesFromChildren,
  RouterProvider, 
  BrowserRouter} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import Home from "views/Home";
import Profile from "views/examples/Profile";
import Tables from "views/examples/Tables";

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route>
        <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="user-profile" element={<Profile />} />
        <Route path="tables" element={<Tables />} />
      </Route>
      <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
    )
)


function App() {
    return (
        
     <RouterProvider router={router} />
        
    );
  }
  
  export default App;
