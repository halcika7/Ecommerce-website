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
        type: Schema.Types.Mixed,
        required: true,
        default: {}
    }
}, { minimize: false });

module.exports = Roles = mongoose.model('roles', UserRolesSchema);