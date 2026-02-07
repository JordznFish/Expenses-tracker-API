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
 * Login: psql -U postgres 
 * CREATE DATABASE <table_name>
 * list all tables: \l
 * Connect to a table: \c <table_name>
 */
require('dotenv').config();

const express = require('express');
const app = express();

//Translator for express: HTTP request (string) -> json object
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        data: null
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})