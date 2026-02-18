const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware'); 
const { createExpense, getExpense } = require('../controllers/expense.controller');

// --- CRUD ---
// Create Expense
router.post('/', authMiddleware, createExpense);

// Get Expense
router.get('/', authMiddleware, getExpense)

// Update Expense

// Delete Expense

module.exports = router;