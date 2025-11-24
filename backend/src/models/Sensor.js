const mongoose = require('mongoose');


const sensorSchema = new mongoose.Schema(
{
type: { type: String, enum: ['pir', 'cam', 'other'], default: 'pir' },
nodeId: { type: String },
status: { type: String, enum: ['ok', 'alert', 'offline'], default: 'ok' },
value: { type: mongoose.Schema.Types.Mixed },
lastSeen: { type: Date, default: Date.now },
timeline: [
{
status: String,
detail: String,
timestamp: { type: Date, default: Date.now },
},
],
},
{ timestamps: true }
);


module.exports = mongoose.model('Sensor', sensorSchema);