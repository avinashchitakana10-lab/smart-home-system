const mongoose = require('mongoose');


const accessLogSchema = new mongoose.Schema(
{
method: { type: String, enum: ['camera', 'keypad', 'admin'], required: true },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
result: { type: String, enum: ['success', 'failed', 'unknown'], required: true },
pin: { type: String },
faceMatchScore: { type: Number },
ip: { type: String },
timestamp: { type: Date, default: Date.now },
},
{ timestamps: true }
);


module.exports = mongoose.model('AccessLog', accessLogSchema);