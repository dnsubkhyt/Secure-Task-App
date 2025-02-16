const User = require('../models/userModel')


const roleBasedAccessControl = (allowedRoles) => {
    return (req, res, next) => {
        
        User.findById(req.userId, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'User not found' });
            }

            if (allowedRoles.includes(user.role)) {
                next();
            } else {
                return res.status(403).json({ message: 'Access denied: insufficient permissions' });
            }
        });
    };
};

module.exports = roleBasedAccessControl;
