 const Sensor = require('../models/Sensor');
 exports.createOrUpdate = async (req, res) => {
 try {
 const { nodeId, type = 'pir', status = 'ok', value } = req.body;
 if (!nodeId) return res.status(400).json({ error: 'nodeId required' });
 let sensor = await Sensor.findOne({ nodeId });
 const timelineEntry = { status, detail: value ? JSON.stringify(value) : '',
 timestamp: new Date() };
 if (!sensor) {
 sensor = await Sensor.create({ nodeId, type, status, value, lastSeen: new
 Date(), timeline: [timelineEntry] });
 } else {
sensor.status = status;
 sensor.value = value || sensor.value;
 sensor.lastSeen = new Date();
 sensor.timeline.unshift(timelineEntry);
 if (sensor.timeline.length > 200) sensor.timeline.pop();
 await sensor.save();
 }
 res.json(sensor);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };
 exports.list = async (req, res) => {
 try {
 const sensors = await Sensor.find().sort({ updatedAt:-1 });
 res.json(sensors);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };
 exports.get = async (req, res) => {
 try {
 const sensor = await Sensor.findById(req.params.id);
 if (!sensor) return res.status(404).json({ error: 'Not found' });
 res.json(sensor);
 } catch (err) {
 console.error(err);
 res.status(500).json({ error: 'Server error' });
 }
 };