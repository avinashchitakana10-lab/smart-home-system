import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <p className="subtitle">Smart Home Monitoring Overview</p>

      <div className="card-grid">
        <div className="card sensors">
          <h2>Sensors</h2>
          <p className="count">3</p>
          <p className="desc">Active sensors in system</p>
        </div>
        <div className="card cameras">
          <h2>Cameras</h2>
          <p className="count">1</p>
          <p className="desc">Live camera feeds</p>
        </div>
        <div className="card doors">
          <h2>Doors</h2>
          <p className="count">1</p>
          <p className="desc">Doors monitored</p>
        </div>
      </div>

      <div className="overview">
        <h3>System Overview</h3>
        <p>Sensors: <b>3</b></p>
        <p>Cameras: <b>1</b></p>
        <p>Doors: <b>1</b></p>
      </div>
    </div>
  );
}

export default Dashboard;
