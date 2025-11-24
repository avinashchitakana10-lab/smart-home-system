import axios from 'axios';

// Vite exposes env vars on import.meta.env and prefixes custom vars with VITE_
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/auth`;
const PROFILE_URL = `${API_BASE}/api/profile`;

export async function login(email, password) {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  if (res.data.token) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
}


export async function register(name, email, password) {
  return axios.post(`${API_URL}/register`, { name, email, password });
}
export async function getProfile() {
  const res = await axios.get(PROFILE_URL, { headers: {} });
  return res.data;
}

export async function updateProfile(profile) {
  const res = await axios.put(PROFILE_URL, profile, { headers: {} });
  return res.data;
}

export async function logout() {
  localStorage.removeItem('user');
}