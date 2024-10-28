const jwt = require('jsonwebtoken');
const config = require('../config/config').jwt;

// Middleware to check if user has a valid token and a specific role
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extract token

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, config.jwt_secret);  // Verify the token

            // Check if the user's role is allowed
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
            }

            req.user = decoded;  // Attach user info (including role) to the request object
            next();  // Pass control to the next handler
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authorizeRole;
