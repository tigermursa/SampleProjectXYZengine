import React from "react";
import NaigationBar from "../NavigationBar/NaigationBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 min-h-screen">
      {/* padding top and bottom for all outlet */}
      <NaigationBar />
      <div className="pt-24 pb-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
