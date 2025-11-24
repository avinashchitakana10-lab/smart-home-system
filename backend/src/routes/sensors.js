 const express = require('express');
 const router = express.Router();
 const ctrl = require('../controllers/sensorController');
 const auth = require('../middleware/auth');
 // ESP device posts updates (no auth by default — add device token if required)
 router.post('/update', ctrl.createOrUpdate);
 // Admin routes
 router.get('/', auth, ctrl.list);
 router.get('/:id', auth, ctrl.get);
 module.exports = router;