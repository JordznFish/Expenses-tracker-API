const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// STEP 2 GOAL: Authenticate existing users and issue JWT token.
const login = (async (req, res) => {
    try {
        // Extract Input from HTML
        const { email, password } = req.body || {};

        // Validate the user input
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Invalid input!"
            });
        };

        // Query DB to match 
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
        
        // EDGE CASE: No existing user
        if (existingUser.rows.length === 0) {
            return res.json({
                success: false,
                message: 'Unknown email.'
            })
        }

        const user = existingUser.rows[0];

        // Compare password (bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Wrong password!'
            });
        };

        // Generate JWT Token
        // JWT structure: header.payload.signature
        const token = jwt.sign(
            {userId: user.id}, // payload (obj)
            process.env.SECRET_KEY, // secret (string)
            {expiresIn: '1h'} // options (obj)
        );

        //Return token as result
        return res.json({
            success: true,
            message: 'Login successful!',
            token
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: 'Server error'
        });
    }
})

// STEP 1 GOAL: return a callback function for app.use('/auth', function) in app.js
const register = (async (req, res) => {
    try {
        //Get user info from HTML
        const {email, password} = req.body;

        //Edge case, if one of them are empty
        if (!email || !password) {
            return res.json({
                success: false,
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
                success: false,
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
            success: true,
            message: 'User registered successfully!',
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        return res.json({
            success: false,
            message: err
        });
    }
})

module.exports = { register, login };
