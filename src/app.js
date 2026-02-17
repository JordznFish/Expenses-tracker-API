// Load environment variables first
require('dotenv').config();

const express = require('express');
const pool = require('../db/db');
const app = express();
const authRoutes = require('../src/routes/authRoutes');
const authMiddleware = require('../src/middlewares/auth.middleware');
const expenseRoutes = require('../src/routes/expense.routes');

//Middleware: Translator for express: HTTP request (string) -> json object
app.use(express.json());

//TODO: SELF-EXECUTING ANONYMOUS FUNCTION: A safeguard verifies the database (async： )
(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Successfully connected to Database!');
    } catch (err) {
        console.log('Unexpected error: ', err);
        process.exit(1);
    }
})();

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date(),
        data: null
    });
});

// TODO: Import your real routes here later (e.g., app.use('/api/expenses', expenseRoutes))
app.use('/auth', authRoutes);

//TODO: We just need to design how it works, the front-end will decide how users get here
app.use('/expenses', expenseRoutes);

//Imagine front-end redirects the user to this URL after logging in
app.get('/protected', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: 'Access granted',
        user: req.user
    });
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})