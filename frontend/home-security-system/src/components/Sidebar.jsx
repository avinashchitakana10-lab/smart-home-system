import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { logout } from '../api/auth';
import './Sidebar.css';

function Sidebar({ collapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (route) => pathname === route;

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        {!collapsed && (
          <h4 className="brand text-white text-center mb-4 fw-bold">Smart Home</h4>
        )}

        <Nav className="flex-column">
          {[
            { icon: "🏠", route: ROUTES.dashboard, label: "Dashboard" },
            { icon: "🧭", route: ROUTES.sensors, label: "Sensors" },
            { icon: "📷", route: ROUTES.cam, label: "Camera" },
            { icon: "🚪", route: ROUTES.door, label: "Door Control" },
            { icon: "📑", route: ROUTES.accessLogs, label: "Access Logs" },
            { icon: "🙂", route: ROUTES.faceEnrollment, label: "Face Enrollment" },
            { icon: "🔔", route: ROUTES.notifications, label: "Notifications" },
            { icon: "⚙️", route: ROUTES.settings, label: "Settings" },
          ].map((item, i) => (
            <Nav.Link
              key={i}
              as={Link}
              to={item.route}
              active={isActive(item.route)}
              className="sidebar-link d-flex align-items-center"
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="label ms-2">{item.label}</span>}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      <div className="sidebar-bottom">
          <Nav.Link
            onClick={handleLogout}
            className="sidebar-link logout-link d-flex align-items-center justify-content-center"
          >
            <span className="icon">🚪</span>
            {!collapsed && <span className="label ms-2">Logout</span>}
          </Nav.Link>
      </div>

    </div>
  );
}

export default Sidebar;
