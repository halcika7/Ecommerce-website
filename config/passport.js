const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const UserModel = require('../models/User');
const secret = require('../config/keys').secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				const user = await UserModel.findById(jwt_payload.id);
				if (user) return done(null, user);
				return done(null, false);
			} catch (err) {
				return console.log(err);
			}
		})
	);
};
