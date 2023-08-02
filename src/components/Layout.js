import React from "react";
import Navigation from "./Navigation";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="Layout">
      <Navigation />
      <Outlet/>
    </div>
  );
};

export default Layout;