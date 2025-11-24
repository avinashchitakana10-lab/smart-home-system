import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const FACES_URL = `${API_BASE}/api/faces`;

function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  }
  return {};
}

export async function enrollFaces(formData) {
  // formData should include uploaded photos (see FaceEnrollment page)
  return axios.post(`${FACES_URL}/enroll`, formData, { headers: authHeader() });
}

export async function listFaces() {
  return axios.get(FACES_URL, { headers: authHeader() });
}

export async function uploadCapture(photo) {
  const formData = new FormData();
  formData.append('photo', photo);
  return axios.post(`${FACES_URL}/capture`, formData, { headers: authHeader() });
}
export async function recognizeFace(photo) {
  const formData = new FormData();
  formData.append('photo', photo);
  return axios.post(`${FACES_URL}/recognize`, formData, { headers: authHeader() });
}