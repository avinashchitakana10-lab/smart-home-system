// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// pages
import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import Cam from './pages/Cam';
import DoorControl from './pages/DoorControl';
import AccessLogs from './pages/AccessLogs';
import FaceEnrollment from './pages/FaceEnrollment';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Simple NotFound fallback (keeps file self-contained)
function NotFound() {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
}

function App() {
  const isLoggedIn = !!localStorage.getItem('user');

  return (
    <Routes>
      {/* PUBLIC (no Layout) */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />

      {/* PROTECTED: Layout wraps ONLY the protected routes.
          ProtectedRoute should return children when authenticated,
          and <Navigate to="/login" /> when not. */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="sensors" element={<Sensors />} />
        <Route path="cam" element={<Cam />} />
        <Route path="door" element={<DoorControl />} />
        <Route path="access-logs" element={<AccessLogs />} />
        <Route path="face-enrollment" element={<FaceEnrollment />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
