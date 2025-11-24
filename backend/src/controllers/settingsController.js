const SystemSetting = require('../models/SystemSetting');
 exports.get = async (req, res) => {
 try {
 const items = await SystemSetting.find();
 res.json(items);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };
 exports.set = async (req, res) => {
 try {
 const { key, value } = req.body;
 if (!key) return res.status(400).json({ error: 'key required' });
 const s = await SystemSetting.findOneAndUpdate({ key }, { value }, {
 upsert: true, new: true });
 res.json(s);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };