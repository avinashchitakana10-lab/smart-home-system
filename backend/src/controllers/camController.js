 const SystemSetting = require('../models/SystemSetting');
 const Sensor = require('../models/Sensor');
 exports.updateCamStatus = async (req, res) => {
 try {
 const { nodeId, status = 'ok', streamUrl } = req.body;
 if (!nodeId) return res.status(400).json({ error: 'nodeId required' });
 let cam = await Sensor.findOne({ nodeId });
 const timelineEntry = { status, detail: streamUrl || '', timestamp: new
 Date() };
 if (!cam) {
 cam = await Sensor.create({ nodeId, type: 'cam', status, value: {
 streamUrl }, lastSeen: new Date(), timeline: [timelineEntry] });
 } else {
 cam.status = status;
 cam.value = { ...(cam.value || {}), streamUrl };
 cam.lastSeen = new Date();
 cam.timeline.unshift(timelineEntry);
 if (cam.timeline.length > 200) cam.timeline.pop();
 await cam.save();
 }
 res.json(cam);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };
 exports.getCam = async (req, res) => {
 try {
 const cam = await Sensor.findOne({ nodeId: req.params.nodeId });
 if (!cam) return res.status(404).json({ error: 'Cam not found' });
 res.json(cam);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };
 exports.setDoorLock = async (req, res) => {
 try {
 const { locked } = req.body;
 if (typeof locked !== 'boolean') return res.status(400).json({ error:
 'locked must be boolean' });
 let s = await SystemSetting.findOneAndUpdate({ key: 'door_locked' }, {
 value: locked }, { upsert: true, new: true });
 res.json({ key: 'door_locked', value: s.value });
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };
 exports.getDoorLock = async (req, res) => {
 try {
 let s = await SystemSetting.findOne({ key: 'door_locked' });
 res.json({ key: 'door_locked', value: s ? s.value : false });
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };