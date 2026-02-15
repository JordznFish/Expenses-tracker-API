const pool = require('../../db/db');
const bcrypt = require('bcrypt');

// We assume we're using GET/POST method
// Before writting code logic, look at app.js and authRoutes
// GOAL: return a callback function for app.use('/auth', function) in app.js

const register = (async (req, res) => {
    try {
        //Get user info from HTML
        const {email, password} = req.body;

        //Edge case, if one of them are empty
        if (!email || !password) {
            return res.json({
                status: false,
                message: 'Username and Password are required!'
            });
        }

        // Edge case, check is it an existing user
        // At this point, we need pool to query from db
        // If there's a matching user, we return false 
        // whenever we use pool.query, add await (so everything within this function pauses)
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if (existingUser.rows.length > 0) {
            return res.json({
                status: false,
                message: 'User already exists!'
            });
        }

        // All edge cases checked, now we know this is a new user
        // We wanna hash the user's password to protect them
        // 10 Salt rounds: Run the hashing algorithm 10 times 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Now we got all information ready, time to INSERT INTO our DB
        // Since INSERT INTO doesn't return anything, but we need those information for visuals
        //  We use RETURNING
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash',
            [email, hashedPassword]
        );

        return res.json({
            status: true,
            message: 'User registered successfully!',
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        return res.json({
            status: false,
            message: err
        });
    }
})

module.exports = { register };
