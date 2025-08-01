import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function MobileSidebar() {
  const sidebarLinks = [
    { icon: "assets/sidebar-icon/menu.png", text: "Dashboard", path: "/" },
    { icon: "assets/sidebar-icon/documents.png", text: "Products", path: "products" },
    { icon: "assets/sidebar-icon/salary.png", text: "Selling", path: "selling" },
    { icon: "assets/sidebar-icon/order.png", text: "Orders", path: "orders" },
    { icon: "assets/sidebar-icon/man-avatar.png", text: "Customer", path: "customer" },
    { icon: "assets/sidebar-icon/menu .png", text: "Categories", path: "categories" },
    { icon: "assets/sidebar-icon/classification.png", text: "Sub Categories", path: "sub-categories" },
  ];

  // JavaScript function to hide the offcanvas
  const hideOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasExample");
    offcanvasElement.classList.add("hiding")
    offcanvasElement.classList.remove("show")
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) {
      backdrop.classList.remove("show");
      backdrop.style.display = "none";
    }


    // Check if offcanvas instance is created properly
    // if (offcanvasElement) {
    //   const offcanvasInstance = new window.bootstrap.Offcanvas(offcanvasElement);
    //   offcanvasInstance.hide();

    //   // Remove the backdrop manually
    //   const backdrop = document.querySelector(".offcanvas-backdrop");
    //   if (backdrop) {
    //     backdrop.classList.remove("show");
    //     backdrop.style.display = "none";
    //   }
    // }
  };

  return (
    <>
      <div className="offcanvas-section">
        <div
          className="offcanvas offcanvas-start mobil_menu_wrapper d-lg-none d-block"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          {/* Header Section */}
          <div className="offcanvas-header">
            <Link onClick={hideOffcanvas} to='/' className="offcanvas-title" id="offcanvasExampleLabel">
              <img src="./assets/logo.png" alt="logo" className="img-fluid" />
            </Link>
            <button
              type="button"
              className="custom_close_btn"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={hideOffcanvas} // Close offcanvas when the close button is clicked
            ><i class="fa-solid fa-xmark"></i></button>
          </div>

          {/* Sidebar Links */}
          <div className="sidebar-links">
            {sidebarLinks.map((link, index) => (
              <div className="sidebar-link ms-3" key={index}>
                <NavLink to={link.path}>
                  <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={hideOffcanvas}

                    className="text-decoration-none bg-transparent text-light border-0"
                  >
                    <div className="d-flex align-items-center">
                      <span>
                        <img src={link.icon} alt={link.text} />
                      </span>
                      <p className="ms-2 m-0 activeText">{link.text}</p>
                      {link.isArrow && (
                        <i className="fa-solid fa-arrow-right ms-auto"></i>
                      )}
                    </div>
                  </button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
