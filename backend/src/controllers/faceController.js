const Face = require('../models/Face');

const enroll = async (req, res) => {
  try {
    const { name, email } = req.body;
    const files = req.files || [];
    if (!name || files.length === 0) {
      return res.status(400).json({ error: 'Name and at least one photo required' });
    }

    const photos = files.map(f => '/uploads/' + f.filename);
    const face = await Face.create({ name, email, photos, pending: false });
    res.json(face);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const list = async (req, res) => {
  try {
    const faces = await Face.find().sort({ createdAt: -1 });
    const total = faces.length;
    const active = faces.filter(f => f.active).length;
    const pending = faces.filter(f => f.pending).length;
    res.json({ total, active, pending, faces });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const uploadCapture = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ path: '/uploads/' + file.filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Properly export all controller functions
module.exports = {
  enroll,
  list,
  uploadCapture,
};
