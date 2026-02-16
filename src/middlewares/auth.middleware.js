const jwt = require('jsonwebtoken');

// Middleware are synchronous code, does JWT calculation locally on my PC
const authMiddleware = (req, res, next) => {
    try {
        // Get header
        const authHeader = req.headers.authorization;

        // Check if authHeader exists
        // Origin if authorized: Authorization: Bearer token123 
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Compare token vs SECRET_KEY
        // Verify token.headers + token.payload + SECRET_KEY === token.signature
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // attach user info to req
        // jwt.verify returns JWT payload that I created using jwt.sign() 
        req.user = decoded;

        // Proceeds to next function
        next();
        
    } catch (err) {
        return res.json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}

module.exports = authMiddleware;