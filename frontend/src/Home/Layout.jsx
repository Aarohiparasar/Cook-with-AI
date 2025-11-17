import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
