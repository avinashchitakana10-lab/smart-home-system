const SystemSetting = require('../models/SystemSetting');
const AccessLog = require('../models/AccessLog');

/**
 * Set door lock status (locked/unlocked)
 * Called by admin or automatically by access system
 */
exports.setDoorStatus = async (req, res) => {
  try {
    const { locked, reason = 'manual' } = req.body;
    if (typeof locked !== 'boolean')
      return res.status(400).json({ error: 'locked must be a boolean' });

    // Update door lock state
    const setting = await SystemSetting.findOneAndUpdate(
      { key: 'door_locked' },
      { value: locked },
      { upsert: true, new: true }
    );

    // Add to access log
    await AccessLog.create({
      method: 'admin',
      result: locked ? 'locked' : 'unlocked',
      meta: { reason },
    });

    res.json({
      message: locked ? 'Door locked' : 'Door unlocked',
      status: locked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Get current door lock status
 */
exports.getDoorStatus = async (req, res) => {
  try {
    const setting = await SystemSetting.findOne({ key: 'door_locked' });
    const locked = setting ? setting.value : false;
    res.json({ locked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Toggle door lock (if current locked → unlock, else lock)
 */
exports.toggleDoor = async (req, res) => {
  try {
    let setting = await SystemSetting.findOne({ key: 'door_locked' });
    const newValue = !(setting ? setting.value : false);
    setting = await SystemSetting.findOneAndUpdate(
      { key: 'door_locked' },
      { value: newValue },
      { upsert: true, new: true }
    );

    await AccessLog.create({
      method: 'admin',
      result: newValue ? 'locked' : 'unlocked',
      meta: { reason: 'toggle' },
    });

    res.json({
      message: newValue ? 'Door locked' : 'Door unlocked',
      locked: newValue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
