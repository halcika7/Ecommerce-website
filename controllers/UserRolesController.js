const UserRolesModel = require('../models/UserRole');
const UserModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const validateRole = require('../validation/roleValidation');

exports.addUserRole = async (req, res) => {
    try{
        const {failedMessage, isValid} = validateRole(req.body.name);
        if(!isValid) {return res.json(failedMessage);}
        const newRole = new UserRolesModel({ name: req.body.name, isAdmin: req.body.isAdmin, permissions: req.body.permissions });
        await newRole.save();
        return res.json({ successMessage: 'New Role Added !' });
    }catch(err) {
        return res.json({ failedMessage: err.errmsg });
    }
}

exports.getRoles = async (req,res) => {
    try{
        const roles = await UserRolesModel.find({});
        // const user = await UserModel.find({ role: {"$ne": new ObjectId('5c65ed491c9d440000b29bf4')} })
        return res.json(roles);
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.deleteAllRoles = async (req, res) => {
    try{
        const response = await UserRolesModel.deleteMany({});
        if(response.n === 0) return res.json({ failedMessage: 'No Permissions deleted !' });
        return res.json({ successMessage: 'Permissions deleted !' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.deleteUserRole = async (req, res) => {
    try {
        const response = await UserRolesModel.deleteOne({ name: req.query.name });
        if(response.n === 0) return res.json({ failedMessage: 'No Roles deleted !' });
        return res.json({ successMessage: 'Roles deleted !' });
    }catch (err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.getRole = async (req, res) => {
    try{
        const response = await UserRolesModel.findById(req.body.id).select('isAdmin permissions name');
        return res.json(response);
    }catch (err) {
        return res.json({ failedMessage: true });
    }
}

exports.updateRole = async (req, res) => {
    const {failedMessage, isValid} = validateRole(req.body.name);
    if(!isValid) {return res.json(failedMessage);}
    try{
        const findByName = await UserRolesModel.findOne({ name: req.body.name });
        const findById = await UserRolesModel.findById(req.body.id);
        if(findByName && !findByName._id.equals(findById._id) && findByName.name !== findById.name) {
            return res.json({ failedMessage: 'Name Already in use' });
        }

        await UserRolesModel.updateOne({ _id: req.body.id }, {
            name: req.body.name,
            isAdmin: req.body.isAdmin,
            permissions: req.body.permissions
        });

        const updatedRole = await UserRolesModel.findById(req.body.id);

        return res.json({ successMessage: 'Role updated!' , role: updatedRole});
    }catch(err) {
        const message = err.message ? err.message : err.CastError;
        return res.json({ failedMessage: message });
    }
}
// const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@[]{}/\\|%&*()#$&'.split('').sort((a, b) => Math.random()>.5 ? -1: 1).join('');
// let password = '';
// for (var i = 15; i > 0; --i) password += mask[Math.round(Math.random() * (mask.length - 1))];