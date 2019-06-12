const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

module.exports = (req, res, next, permission=null) => {
	const token = req
		.header('Authorization')
		.slice(7)
		.toString();
	if (!token) {
		return res.json({
			authenticationFailed: 'No token, authorization denied!'
		});
	}
	try {
		const decoded = jwt.verify(token, secret);
		if(permission) {
			const includes = decoded.role.permissions.includes(permission);
			if(!includes) { return res.json({ failedMessage: 'Permission denied' }) };
		}
		req.userdata = decoded.user;
		next();
	} catch (err) {
		return res.json({
			authenticationFailed: 'Invalid token provided. Please login'
		});
	}
};
