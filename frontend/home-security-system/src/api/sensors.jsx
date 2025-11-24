import axios from 'axios';
// Vite env vars are available on import.meta.env and commonly prefixed with VITE_
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SENSORS_URL = `${API_BASE}/api/sensors`;

export async function getSensors() {
  const res = await axios.get(SENSORS_URL, { headers: authHeader() });
  return res.data.sensors || res.data;
}

export async function getSensor(id) {
  const res = await axios.get(`${SENSORS_URL}/${id}`, { headers: authHeader() });
  return res.data;
}

export async function updateSensor(data) {
  // ESP32 or backend posts to /api/sensors/update (no auth)
  return axios.post(`${SENSORS_URL}/update`, data);
}

function authHeader() {
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }; // attach JWT header
  }
  return {};
}
