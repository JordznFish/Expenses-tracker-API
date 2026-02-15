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

/**
 * ============================================================
 * MAIN APPLICATION ENTRY
 * ============================================================
 * 
 * Responsibilities:
 * - Load environment variables
 * - Initialize Express app
 * - Register global middleware
 * - Mount routes
 * - Start HTTP server
 * 
 * TODO:
 * [DONE] Confirm dotenv loads before anything else
 * [] Verify DB connection on startup
 * [ ] Add global error handler (later)
 * [ ] Add request logging middleware (later)
 */

// Load environment variables first
require('dotenv').config();

const express = require('express');
const pool = require('../db/db');
const app = express();

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

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})