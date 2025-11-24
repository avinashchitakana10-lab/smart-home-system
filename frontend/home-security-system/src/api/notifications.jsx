import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const NOTI_URL = `${API_BASE}/api/notifications`;

function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  }
  return {};
}

export async function getNotificationSettings() {
  return axios.get(NOTI_URL, { headers: authHeader() });
}

export async function updateNotificationSettings(settings) {
  return axios.post(NOTI_URL, settings, { headers: authHeader() });
}
