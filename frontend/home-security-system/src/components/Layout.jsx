import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Navbar, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { BsList } from "react-icons/bs";
import './Layout.css';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar bg="primary" variant="dark" className="top-navbar px-3">
        <Container fluid className="d-flex align-items-center justify-content-between">

          {/* Hamburger Icon */}
          <BsList
              size={32}
              className="text-white hamburger-btn"
              onClick={() => setCollapsed(!collapsed)}
              style={{ cursor: "pointer" }}
            />


          <Navbar.Brand className="mb-0 fs-4 fw-semibold">
            Smart Home Security
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Body Layout */}
      <div className="layout-body">
        <Sidebar collapsed={collapsed} />
        <main className={`layout-content ${collapsed ? 'expanded' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
