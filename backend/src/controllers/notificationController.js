const NotificationSetting = require('../models/NotificationSetting');
const mailer = require('../utils/mailer');
const sms = require('../utils/sms');
const push = require('../utils/push');

const getSettings = async (req, res) => {
  try {
    const s = await NotificationSetting.findOne({ userId: req.user._id });
    res.json(s || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const payload = req.body;
    const s = await NotificationSetting.findOneAndUpdate(
      { userId: req.user._id },
      payload,
      { upsert: true, new: true }
    );
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const testNotification = async (req, res) => {
  try {
    const { type } = req.body;
    if (type === 'email') await mailer.sendEmail({ to: req.user.email, subject: 'Test', text: 'Test message' });
    if (type === 'sms') await sms.sendSMS({ to: req.user.phone, body: 'Test SMS' });
    if (type === 'push') await push.sendPush({ deviceId: 'device-xxx', title: 'Test', body: 'Test push' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  testNotification,
};
