const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.cookies.auth_token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access denied.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.userId = decoded.user_id
        req.role = decoded.role
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token, authentication failed.' })
    }
}

module.exports = authMiddleware
