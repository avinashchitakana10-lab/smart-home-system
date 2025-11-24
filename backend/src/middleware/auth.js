const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = async (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ error: 'No token' });


const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ error: 'No token' });


try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload.id).select('-password');
if (!user) return res.status(401).json({ error: 'User not found' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid token' });
}
};