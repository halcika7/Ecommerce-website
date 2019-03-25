const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRolesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    permissions: {
        type: Object,
        required: true,
        default: null
    }
});

module.exports = Roles = mongoose.model('roles', UserRolesSchema);