const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
try {
const { name, email, password, phone } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });


let user = await User.findOne({ email });
if (user) return res.status(400).json({ error: 'User exists' });


const hashed = await bcrypt.hash(password, 10);
user = await User.create({ name, email, password: hashed, phone });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};
exports.login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Missing fields' });


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ error: 'Invalid credentials' });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ error: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};
exports.me = async (req, res) => {
res.json(req.user);
};


exports.changePassword = async (req, res) => {
try {
const { oldPassword, newPassword } = req.body;
const user = await User.findById(req.user._id);
const match = await bcrypt.compare(oldPassword, user.password);
if (!match) return res.status(400).json({ error: 'Old password incorrect' });
user.password = await bcrypt.hash(newPassword, 10);
await user.save();
res.json({ ok: true });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};