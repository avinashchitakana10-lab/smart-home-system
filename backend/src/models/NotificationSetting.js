const mongoose = require('mongoose');


const notificationSettingSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
sms: { enabled: { type: Boolean, default: false }, phone: { type: String } },
email: { enabled: { type: Boolean, default: true }, address: { type: String } },
push: { enabled: { type: Boolean, default: false }, deviceId: { type: String } },
buzzer: { enabled: { type: Boolean, default: true } },
});


module.exports = mongoose.model('NotificationSetting', notificationSettingSchema);