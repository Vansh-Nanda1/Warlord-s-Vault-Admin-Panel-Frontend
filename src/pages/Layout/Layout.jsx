import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Component/Sidebar";
import Header from "../../Component/Header";

export default function Layout() {
  return (
    <div className="layout-section">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar Section */}
          <div className="col-2 col-lg-2 text-white p-0">
            <Sidebar />
          </div>

          {/* Main Content Section */}
          <div className="col-12 col-md-12 col-lg-10 p-0 mainSectioncontent">
            <div className="header-main overflow-x-hidden">
              <Header />
            </div>

            {/* Dynamic Content Rendered via Routes */}
            <div className="content mx-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
