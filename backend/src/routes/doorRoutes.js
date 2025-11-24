const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/doorController');
const auth = require('../middleware/auth');

// Set or toggle door status
router.post('/set', auth, ctrl.setDoorStatus);
router.get('/status', auth, ctrl.getDoorStatus);
router.post('/toggle', auth, ctrl.toggleDoor);

module.exports = router;
