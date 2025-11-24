const AccessLog = require('../models/AccessLog');

exports.create = async (req, res) => {
	try {
		const { method, userId, result, pin, faceMatchScore, ip, meta } = req.body;
		if (!method || !result) return res.status(400).json({ error: 'method and result required' });
		const entry = await AccessLog.create({
			method,
			userId,
			result,
			pin,
			faceMatchScore,
			ip: ip || req.ip,
			meta,
		});
		res.json(entry);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};

exports.list = async (req, res) => {
	try {
		const { from, to, result, method } = req.query;
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 50;
		const q = {};
		if (result) q.result = result;
		if (method) q.method = method;
		if (from || to) q.timestamp = {};
		if (from) q.timestamp.$gte = new Date(from);
		if (to) q.timestamp.$lte = new Date(to);
		const logs = await AccessLog.find(q)
			.sort({ timestamp: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.populate('userId', 'name email');
		const count = await AccessLog.countDocuments(q);
		res.json({ count, page, limit, logs });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};

exports.stats = async (req, res) => {
	try {
		const start = new Date();
		start.setHours(0, 0, 0, 0);
		const end = new Date();
		end.setHours(23, 59, 59, 999);
		const total = await AccessLog.countDocuments({ timestamp: { $gte: start, $lte: end } });
		const success = await AccessLog.countDocuments({ result: 'success', timestamp: { $gte: start, $lte: end } });
		const failed = await AccessLog.countDocuments({ result: 'failed', timestamp: { $gte: start, $lte: end } });
		const unknown = await AccessLog.countDocuments({ result: 'unknown', timestamp: { $gte: start, $lte: end } });
		res.json({ total, success, failed, unknown });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};