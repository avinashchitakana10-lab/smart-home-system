const express = require('express');
 const router = express.Router();
 const ctrl = require('../controllers/camController');
 const auth = require('../middleware/auth');
 router.post('/status', ctrl.updateCamStatus); // esp32 posts status
 router.get('/status/:nodeId', auth, ctrl.getCam);
 router.post('/door', auth, ctrl.setDoorLock);
 router.get('/door', auth, ctrl.getDoorLock);
module.exports = router;