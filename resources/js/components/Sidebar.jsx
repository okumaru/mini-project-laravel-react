import React, { useState } from "react";
import ReactDOM from "react-dom/client";

export default function Sidebar() {

  const [isOpen, setOpen] = useState("");

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isOpen}`} id="accordionSidebar" >

      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="home" >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Client */}
      <li className="nav-item">
        <a className="nav-link" href="/client">
          <i className="fas fa-fw fa-address-book"></i>
          <span>Clients</span>
        </a>
      </li>

      {/* Nav Item - Project */}
      <li className="nav-item">
        <a className="nav-link" href="/project">
          <i className="fas fa-fw fa-thumbtack"></i>
          <span>Projects</span>
        </a>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* Toggle */}
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => setOpen( !isOpen ? 'toggled' : '' ) }
        ></button>
      </div>
    </ul>
  );
}

if (document.getElementById("sidebar")) {
  const Index = ReactDOM.createRoot(document.getElementById("sidebar"));
  Index.render(
    <React.StrictMode>
      <Sidebar />
    </React.StrictMode>
  );
}
