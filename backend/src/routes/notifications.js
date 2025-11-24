 const express = require('express');
 const router = express.Router();
 const ctrl = require('../controllers/notificationController');
 const auth = require('../middleware/auth');
 router.get('/', auth, ctrl.getSettings);
 router.post('/', auth, ctrl.updateSettings);
 router.post('/test', auth, ctrl.testNotification);
 module.exports = router;