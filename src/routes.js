import Index from "views/Index.js";
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
        path: "/admin/home", // Root path for the parent layout
        name: "Home",
        icon: "ni ni-tv-2 ",
        component: <Index />,
      },
      {
        path: "/admin/user-profile", // Absolute path for the child route starting with "/"
        name: "User Profile",
        icon: "ni ni-single-02 ",
        component: <Profile />,
      },
      {
        path: "/admin/tables", // Absolute path for the child route starting with "/"
        name: "Travel Logs",
        icon: "ni ni-bullet-list-67 ",
        component: <Tables />,
      }
    ]
  },
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
];

export default routes;
