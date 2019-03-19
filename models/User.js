const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    userInfo: {
        telephone: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        postal: {
            type: String,
            default: ''
        }
    },
    role: {
        type: Schema.Types.ObjectId,
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
            type: String,
        },
        expiresIn: {
            type: Date,
        }
    }
});

module.exports = User = mongoose.model('users', UserSchema);