const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

module.exports = (req, res, next) => {
	const token = req
		.header('Authorization')
		.slice(7)
		.toString();
	if (!token) {
		return res.json({
			permissionDenied: 'No token, authorization denied!'
		});
	}
	try {
        const decoded = jwt.verify(token, secret);
		req.userdata = decoded.user;
		next();
	} catch (err) {
		return res.json({
			permissionDenied: 'Invalid token provided. Please login'
		});
	}
};
