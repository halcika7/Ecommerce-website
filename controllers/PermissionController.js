const PermissionModel = require('../models/Permission');
const UserRoleModel = require('../models/UserRole');
const ObjectId = require('mongoose').Types.ObjectId;
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
        const permission = await PermissionModel.deleteOne({ permission: req.query.permission  });
        if(permission.n === 0) { return res.json({ failedMessage: 'Permission is not deleted' }); }
        await UserRoleModel.updateMany({},{ $pull: { permissions: req.query.permission }  });
        return res.json({ successMessage: 'Permission deleted !' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.deleteManyPermissions = async (req, res) => {
    const permissions = Object.keys(req.query).map(permission => req.query[permission]);
    try{
        const deletedPermissions = await PermissionModel.deleteOne({ permission: {$in: permissions}  });
        if(deletedPermissions.n === 0) { return res.json({ failedMessage: 'Permission is not deleted' }); }
        await UserRoleModel.updateMany({},{ $pull: { permissions: {$in: permissions} }  });
        return res.json({ successMessage: 'Permission deleted !' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}