// Manage database connections
// Remote control to access the database (Efficiency purpose)
/**
 * ============================================================
 * DB CONNECTION LAYER
 * ============================================================
 * 
 * Responsibilities:
 * - Initialize PostgreSQL connection pool (Import)
 * - Export pool instance for query reuse (Export)
 * - Handle connection-level errors (Edge case handling)
 * 
 * TODO:
 * [ ] Ensure DATABASE_URL exists in environment variables
 * [ ] Add connection logging (success / error)
 * [ ] Understand why Pool is preferred over Client
 * [ ] Test connection manually using SELECT 1
 * 
 * Future Improvements:
 * - Add query timeout handling
 * - Add centralized query wrapper
 */

// Load pg library, so that we could talk to the database
const { Pool } = require('pg');

// TODO: Read DATABASE_URL from process.env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// TODO: Log successful connection
pool.on('connect', () => {
    console.log('Successfully logged into database.');
});

// TODO: Handle unexpected errors
pool.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

// TODO: Export
module.exports = pool;





