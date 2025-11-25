import App from "../App";
import Error404 from "../components/Error404";
import Login from "../components/login";
import Register from "../components/register";
import DashBoard from "../pages/dashboard";
import ServiceGarage from "../pages/dich-vu";
import Customers from "../pages/khach-hang";
import Technicians from "../pages/ky-thuat-vien";
import PartCars from "../pages/phu-tung";
import Settings from "../pages/settings";
import Payment from "../pages/thanh-toan";
import Statistical from "../pages/thong-ke";
import VehicleReception from "../pages/tiep-nhan-xe";
import Cars from "../pages/xe";

export const elementRoute = [
  {
    part: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "/vehiclereception",
        element: <VehicleReception />
      },
      {
        path: "/payment",
        element: <Payment />
      },
      {
        path: "/statistical",
        element: <Statistical />
      },
      {
        path: "/customers",
        element: <Customers />
      },
      {
        path: "/services",
        element: <ServiceGarage />
      },
      {
        path: "/parts",
        element: <PartCars />
      },
      {
        path: "/technicians",
        element: <Technicians />
      },
      {
        path: "/cars",
        element: <Cars />
      },
      {
        path: "/settings",
        element: <Settings />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "*",
    element: <Error404 />
  }
]