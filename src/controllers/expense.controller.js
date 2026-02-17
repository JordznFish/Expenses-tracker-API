/**
 * ============================================================
 * PHASE 4 — CREATE EXPENSE
 * ============================================================
 *
 * GOAL:
 * Allow authenticated users to create an expense.
 *
 * FLOW:
 * 1. Require JWT (middleware) 
 * 2. Extract userId from req.user
 * 3. Extract expense fields from req.body
 * 4. Validate required fields
 * 5. Insert into DB
 * 6. Return created expense
 *
 * SECURITY RULES:
 * - Never trust client user_id
 * - Always use req.user.userId
 * - Validate amount > 0
 *
 * STATUS CODES:
 * 201 → Created
 * 400 → Validation error
 * 401 → Unauthorized
 * 500 → Server error
 */
const pool = require('../../db/db');

const createExpense = async (req, res) => {
    try {
        const userID = req.user.userId;
        const { category_id, amount, description, expense_date } = req.body;

        if (!amount || !expense_date) {
            return res.status(400).json({
                success: false,
                message: 'Amount and expense date are required!'
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must not be 0 or lower'
            });
        }

        const result = await pool.query(
            `INSERT INTO expenses 
             (user_id, category_id, amount, description, expense_date)
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *;`,
            [userID, category_id, amount, description, expense_date]
        );

        return res.status(201).json({
            success: true,
            message: 'Expense created successfully',
            data: result.rows[0]
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = { createExpense };


