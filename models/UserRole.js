const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRolesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    permissions: {}
});

module.exports = Roles = mongoose.model('roles', UserRolesSchema);