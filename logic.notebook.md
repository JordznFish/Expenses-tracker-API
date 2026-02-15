/**
 * A place to configure how should my tools work (Setup logic)
 * Typically handles 4 things:
 *  1. Global configuration: Initializing dotenv & express
 *  2. Middleware setup: tell Express to understand JSON and security headers (not now)
 *  3. Route registration: Importing route files and telling which URL prefixes (/api/users) to go (userRoutes)
 *  4. Error Handling: "Catch-All" safety net
 * 
 * Notes:
 * req is the entire Http request and it splits into 3 components
 * 1. req.url: string (URL)
 * 2. req.headers: JSON (Metadata; E.g. who, what browser, what language)
 * 3. req.body: JSON (Data from user; E.g. Username, password, profile)
 * 4. req.params: Path variable (E.g. :id)
 * 5. req.query: Query string (Optional filter E.g. ?name1=value1&name2=value2)
 * 
 * Status convention
 * 200: Success
 * 300: Redirection
 * 400: Client Error
 * 500: Server Error
 * 
 * .Env file uses storage space on disk
 * env global variables are saved into RAM temporary to give me access globally when I run my scripts
 * 
 * POSTGRES
 * Outside lobby:
 * Login: psql -U postgres
 * Login to specific database: psql -U postgres -d <database_name> 
 *  INSERT 0 5: You just inserted 5 rows at once using a bulk insert.
    UPDATE 10: You just updated 10 existing rows in the database.
    DELETE 1: You successfully deleted 1 row.
 * 
 * Inside lobby
 * list all tables: \l
 * Connect to a table: \c <table_name>
 * Display Tables in current database: \dt
 * Describe a table: \d <table_name>
 * Display Users roles and permissions: \du
 * Quit psql: \q
 * 
 * 
 * SQL 
 * "psql -U postgres -d expense_tracker -f db/schema.sql"
 * CREATE TABLE <table_name> (
 *  column_name data_type column_constraint
 *  column_name data_type column_constraint);
 * 
 * INSERT INTO <table_name> (column, ...) VALUES (value, ...)
 */



const pool = require('../../db/db');
const bcrypt = require('bcrypt');

//We assume we're using GET/POST method
const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        //Basic validation: if email OR password are empty
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Check if email already exists: query info from database
        // use $num for security
        // return var is an object, but we just want 'rows' (list)
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1', [email]
        );

        if (existingUser.rows.length > 0) {
            return res.json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password with 10 salt rounds
        // Use bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert registered info into database 
        // Use $num for security
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
            [email, hashedPassword]
        );

        // Return if true 
        return res.json({
            success: true,
            message: 'User registered successfully',
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: 'Server error'
        });
    }
}

module.exports = { register };
