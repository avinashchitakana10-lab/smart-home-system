const mongoose = require('mongoose');


const faceSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String },
photos: [{ type: String }], // paths to uploaded images
active: { type: Boolean, default: true },
pending: { type: Boolean, default: false },
recognitionRate: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now },
},
{ timestamps: true }
);


module.exports = mongoose.model('Face', faceSchema);