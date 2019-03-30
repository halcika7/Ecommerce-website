const PermissionModel = require('../models/Permission');
const UserRoleModel = require('../models/UserRole');
const validatePermission = require('../validation/permissionValidation');

exports.addPermission = async (req, res) => {
    try{
        const {failedMessage, isValid} = validatePermission(req.body.permission);
        if(!isValid) {return res.json(failedMessage);}

        const slug = req.body.permission.toLowerCase().split(' ').join('_');
        const permission = req.body.permission;

        const newPermission = new PermissionModel({ slug, permission });
        await newPermission.save();
        return res.json({ successMessage: 'New Permission Added !' });
    }catch(err) {
        return res.json({ failedMessage: err.errmsg });
    }
}

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await PermissionModel.find({});
        return res.json({ permissions });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.deletePermission = async (req, res) => {
    try{
        const response = await PermissionModel.deleteOne({ permission: req.query.permission });
        if(response.n === 0) return res.json({ failedMessage: 'Permission is not deleted' });
        const roles = await UserRoleModel.find({ });
        roles.forEach(async (role, index) => {
            if(role.permissions[req.query.permission] === true){
                delete role.permissions[req.query.permission];
                await UserRoleModel.updateOne({ name: role.name }, { permissions: role.permissions });
            }
        });
        return res.json({ successMessage: 'Permission deleted !' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.deleteAllPermission = async (req, res) => {
    try{
        const response = await PermissionModel.deleteMany({});
        if(response.n === 0) {
            return res.json({ failedMessage: 'No Permissions deleted !' })
        }
        await UserRoleModel.updateMany({}, { $set: { permissions: {} } });
        return res.json({ successMessage: 'Permissions deleted !' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}