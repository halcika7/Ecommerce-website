const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		profilePicture: {
			type: String,
			default: 'public\\images\\placeholder.jpg'
		},
		userInfo: {},
		role: {
			type: Schema.Types.ObjectId,
			ref: 'roles',
			required: true
		},
		emailConfirmation: {
			token: String,
			tokenExparation: Date,
			confirmed: {
				type: Boolean,
				default: false
			}
		},
		resetPassword: {
			token: {
				type: String
			},
			expiresIn: {
				type: Date
			}
		}
	},
	{
		timestamps: true
	}
);

module.exports = User = mongoose.model('users', UserSchema);
