 const express = require('express');
 const router = express.Router();
 const ctrl = require('../controllers/accessController');
 const auth = require('../middleware/auth');
 // Devices post access attempts
 router.post('/', ctrl.create);
 // Admin queries
 router.get('/', auth, ctrl.list);
 router.get('/stats/today', auth, ctrl.stats);
 module.exports = router;