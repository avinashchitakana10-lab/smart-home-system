// src/api/settings.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SETTINGS_URL = `${API_BASE}/api/settings`;

function authHeader() {
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;
  const token = user?.token || localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getSettings() {
  const res = await axios.get(SETTINGS_URL, { headers: authHeader() });
  return res.data;
}

export async function updateSettings(settingsObj) {
  const res = await axios.put(SETTINGS_URL, settingsObj, { headers: authHeader() });
  return res.data;
}
