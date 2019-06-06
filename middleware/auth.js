const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

module.exports = (req,res,next) => {
    const token = req.header('Authorization').slice(7,).toString();
    console.log(token);

    if(!token) {
        return res.json({ failedMessage: 'No token, authorization denied!' })
    }

    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        req.user = decoded.user;
        next();
    } catch(err) {
        res.redirect('/authentication');
    }
}