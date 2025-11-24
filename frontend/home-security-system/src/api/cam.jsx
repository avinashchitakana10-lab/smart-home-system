import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CAM_URL = `${API_BASE}/api/cam`;

function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  }
  return {};
}

export async function getCamStatus(nodeId) {
  return axios.get(`${CAM_URL}/status/${nodeId}`, { headers: authHeader() });
}

export async function updateCamStatus(data) {
  return axios.post(`${CAM_URL}/status`, data);
}

export async function getDoorLock() {
  return axios.get(`${CAM_URL}/door`, { headers: authHeader() });
}

export async function setDoorLock(locked) {
  return axios.post(`${CAM_URL}/door`, { locked }, { headers: authHeader() });
}
