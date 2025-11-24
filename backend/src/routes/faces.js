 const express = require('express');
 const router = express.Router();
 const ctrl = require('../controllers/faceController');
 const auth = require('../middleware/auth');
 const upload = require('../middleware/upload');
 // Enroll (admin or user)
 router.post('/enroll', auth, upload.array('photos', 10), ctrl.enroll);
 // List enrolled users
 router.get('/', auth, ctrl.list);
 // Upload live capture for recognition / storage (from ESP)
 router.post('/capture', upload.single('photo'), ctrl.uploadCapture);
 module.exports = router;