import Home from "views/Home";
import Profile from "views/examples/Profile.js";
import Tables from "views/examples/Tables.js";
import Login from "views/examples/Login";
import Register from "views/examples/Register";
import Icons from "views/examples/Icons.js";
import * as RiIcons from 'react-icons/ri';

var routes = [
  {
      name: "Dashboard",
      icon: "ni ni-tv-2 ",   
    childrens: [
      {
        path: "/dashboard", // Absolute path for the child route starting with "/"
        name: "Home",
        icon: "ni ni-shop",
        component: <Home />,
        layout: "/admin",
      },
      {
        path: "/user-profile", // Absolute path for the child route starting with "/"
        name: "User Profile",
        icon: "ni ni-single-02 ",
        component: <Profile />,
        layout: "/admin",
      },
      {
        path: "/tables", // Absolute path for the child route starting with "/"
        name: "Travel Logs",
        icon: "ni ni-square-pin",
        component: <Tables />,
        layout: "/admin",
      },
     
    ]
  },
  // {
  //   name: "Authentication",
  //     icon: "ni ni-tv-2 ",   
  //   childrens: [
      {
        path: "/login", // Root path for the parent layout
        name: "Login",
        icon: "ni ni-key-25 ",
        component: <Login />,
        layout: "/auth",
      },
      {
        path: "/register", // Root path for the parent layout
        name: "Register",
        icon: "ni ni-circle-08 ",
        component: <Register />,
        layout: "/auth",
      },
  //   ]
  // }
  
];

export default routes;
