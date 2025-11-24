// routes/profile.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FILE = path.join(__dirname, '..', 'data', 'users.json');

// NOTE: This example uses a single user stored in a file for demo/testing only.
// In production use a real DB + auth + password hashing.

function readUsers() {
  try {
    const raw = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    // default demo user
    return {
      id: '1',
      username: 'demo',
      email: 'demo@example.com'
    };
  }
}

function writeUsers(obj) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(obj, null, 2), 'utf8');
}

// GET /api/profile
router.get('/', (req, res) => {
  const user = readUsers();
  res.json(user);
});

// PUT /api/profile -> update username/email
router.put('/', (req, res) => {
  const { username, email } = req.body || {};
  if (!username || !email) {
    return res.status(400).json({ error: 'username and email are required' });
  }
  const user = { ...readUsers(), username, email };
  writeUsers(user);
  res.json(user);
});

module.exports = router;
