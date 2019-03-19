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
    permissions: [
        {
            Read: {
                type: Boolean,
                required: true,
                default: false,
            },
            Write: {
                type: Boolean,
                required: true,
                default: false,
            },
            Update: {
                type: Boolean,
                required: true,
                default: false,
            },
            Delete: {
                type: Boolean,
                required: true,
                default: false,
            }
        }
    ]
});

module.exports = Roles = mongoose.model('roles', UserRolesSchema);