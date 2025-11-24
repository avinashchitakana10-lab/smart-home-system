import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ACCESS_URL = `${API_BASE}/api/access`;

function authHeader() {
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  }
  return {};
}

export async function getAccessLogs(params) {
  return axios.get(ACCESS_URL, { headers: authHeader(), params });
}

export async function logAccess(attempt) {
  return axios.post(ACCESS_URL, attempt);
}

export async function getAccessStats() {
  return axios.get(`${ACCESS_URL}/stats/today`, { headers: authHeader() });
}
