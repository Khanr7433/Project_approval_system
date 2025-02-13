import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <>
      <AdminProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AdminProvider>
    </>
  );
};

export default Layout;
