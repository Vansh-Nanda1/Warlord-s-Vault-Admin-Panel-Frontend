import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  // State for toggling dropdown
  const [isManagementDropdownOpen, setIsManagementDropdownOpen] =
    useState(false);

  // Sidebar links data
  const sidebarLinks = [
    { icon: "/assets/sidebar-icon/menu.png", text: "Dashboard", path: "/" },
    {
      icon: "/assets/sidebar-icon/documents.png",
      text: "Products",
      path: "products",
    },
    { icon: "/assets/sidebar-icon/order.png", text: "Orders", path: "orders" },
    {
      icon: "/assets/sidebar-icon/man-avatar.png",
      text: "Customer",
      path: "customer",
    },
    {
      icon: "/assets/sidebar-icon/list.png",
      text: "Categories",
      path: "categories",
    },
    { icon: "/assets/sidebar-icon/salary.png", text: "Selling", path: "selling" },
    {
      icon: "/assets/sidebar-icon/classification.png",
      text: "Sub Categories",
      path: "sub-categories",
    },
    { icon: "/assets/sidebar-icon/auction.png", text: "Auctions", path: "auctions" },
  ];

  // Management dropdown items
  const managementDropdownLinks = [
    { icon: "/assets/sidebar-icon/information.png", text: "About", path: "#" },
    { icon: "/assets/sidebar-icon/menu .png", text: "Pages", path: "#" },
    { icon: "/assets/sidebar-icon/auction2.png", text: "Auctions", path: "#" },
    { icon: "/assets/sidebar-icon/salary.png", text: "Selling", path: "#" },
    { icon: "/assets/sidebar-icon/man-avatar.png", text: "Sub Admin", path: "#" },
  ];

  return (
    <div className="sidebar-section">
      <div className="sidebar-link-box">
        {/* Logo Section */}
        <div className="logo text-center sideBarlogo position-sticky top-0 py-3">
          <Link to="/">
            <img src="/assets/logo.png" className="img-fluid" width={"100"} alt="Logo" />
          </Link>
          <hr />
        </div>

        {/* Sidebar Links */}
        {sidebarLinks.map((link, index) => (
          <div className="sidebar-link ms-3 sideBar" key={index}>
            <NavLink to={link.path} className="text-decoration-none text-white">
              <div className="sidebar-link-main d-flex align-items-center">
                <span>
                  <img src={link.icon} alt={link.text} />
                </span>
                <p className="ms-2 m-0 activeText">{link.text}</p>
              </div>
            </NavLink>
          </div>
        ))}

        {/* Management Link with Dropdown */}
        <div className="sidebar-link ms-3 mb-5">
          <div
            className="sidebar-link-main d-flex align-items-center justify-content-between"
            onClick={() =>
              setIsManagementDropdownOpen(!isManagementDropdownOpen)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              <span>
                <img
                  src="assets/sidebar-icon/management.png"
                  alt="Management"
                />
              </span>
              <p className="ms-2 m-0">Management</p>
            </div>
            {/* Dropdown Icon */}
            <span
              className={`dropdown-icon ms-1 ${isManagementDropdownOpen ? "rotate" : ""
                }`} // Adjusted margin
            >
              <i className="fas fa-caret-down"></i>
            </span>
          </div>
          {isManagementDropdownOpen && (
            <div className="dropdown ms-4 mt-2">
              {managementDropdownLinks.map((item, idx) => (
                <Link
                  to={item.path}
                  key={idx}
                  className="text-decoration-none text-white d-flex align-items-center mb-2"
                >
                  <img
                    src={item.icon}
                    alt={item.text}
                    className="me-2"
                    style={{ width: "20px" }}
                  />
                  {item.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
