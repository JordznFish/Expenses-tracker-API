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

### Phase 3 - Step 1: Registration
Work flow: auth.controller.js -> authRoutes.js -> app.js 
**Key takeaways:** 
1) app.query() must come with await 
2) bcrypt.hash() must come with await 
3) json file only accepts "" double quotes, on both data and value  
4) wrap multiple functions or data in a object to export 

### Phase 3 - Step 2: Login + JWT Issuance
Work flow: 
1. Receive email + password 
2. Validate Input 
3. Query user from DB 
4. Compare password (bcrypt.compare) 
5. Generate JWT 
6. Return token 
**Key takeaways** 
1) JWT Methods  
   - jwt.sign(payload, secret, option) => Creating the token 
     - payload: an object containing user info. E.g. {id: 1} 
     - secret: A private string used to lock the token 
     - options: Usually {expiresIn: 'time'} 
   - jwt.verify(token, secret) => Check the token is real and hasn't expired 
     - token:  
     - secret 
2) Bcrypt Methods 
   - bcrypt.compare(plainText, hashed_Password in db) => returns Promise<boolean> 

### Phase 3 - Step 3: Auth middleware (JWT verification)
=> Allow request or reject request to protect user data  
=> Use Interface Design: Define API contract first  

Work Flow:
1. Read Authorization header
2. Ensure it follows "Bearer <token>" format
3. Extract token
4. Verify token using JWT_SECRET
5. Attach decoded payload to req.user
6. Call next() if valid
7. Return 401 if invalid or missing

**Key takeaways** 
1) Controllers vs Middleware 
   Controllers: aysnc, because it talks to the database  
   Middleware: usually stays sync, keeps whole operation clean  
2) JWT method
   - jwt.verify(token, secret) => Check the token is real and hasn't 

### Phase 4 - Step 1: Create Expense (User scope)
Work Flow:
1. Require JWT (middleware) 
2. Extract userId from req.user
3. Extract expense fields from req.body
4. Validate required fields
5. Insert into DB
6. Return created expense

**Key takeaways**
REST STYLE
POST   /expenses
GET    /expenses
PUT    /expenses/:id
DELETE /expenses/:id

### Phase 4 - Step 2: Get Expense (User scope)
Goal: Return user data from data base(pool.query)


