const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

exports.loginHelper = (infoPassword, password, errors, res, user) => {
    return bcrypt.compare(infoPassword, password)
        .then(isMatch => {
            if(isMatch){
                // User matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    role: user.role
                }
                // Sign token
                jwt.sign(
                    payload,
                    secret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                });
            }else {
                errors.errors.password = 'Password is incorrect';
                return res.json(errors);
            }
        });
}