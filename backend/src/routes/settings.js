// routes/settings.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FILE = path.join(__dirname, '..', 'data', 'settings.json');

function readSettings() {
  try {
    const raw = fs.readFileSync(FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return {}; // defaults
  }
}

function writeSettings(obj) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(obj, null, 2), 'utf8');
}

// GET /api/settings  -> returns an object like { alertsEnabled: true, ... }
router.get('/', (req, res) => {
  const settings = readSettings();
  res.json(settings);
});

// PUT /api/settings  -> accept JSON object of settings and replace/merge
router.put('/', (req, res) => {
  const incoming = req.body || {};
  if (typeof incoming !== 'object') return res.status(400).json({ error: 'Invalid payload' });

  const current = readSettings();
  const merged = { ...current, ...incoming };
  writeSettings(merged);
  res.json(merged);
});

module.exports = router;
