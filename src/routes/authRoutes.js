// Express + Router
const express = require('express');
const router = express.Router();
// Authorization
const { register, login } = require('../controllers/auth.controller');


// router.method('url', function)

// Register new user
router.post('/register', register);

// Login existing users
router.post('/login', login);

module.exports = router;