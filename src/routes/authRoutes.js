const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth.controller');

// Method (POST)
// router.method('url', function)
router.post('/register', register);

module.exports = router;