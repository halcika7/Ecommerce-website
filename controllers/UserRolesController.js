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

// const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@[]{}/\\|%&*()#$&'.split('').sort((a, b) => Math.random()>.5 ? -1: 1).join('');
// let password = '';
// for (var i = 15; i > 0; --i) password += mask[Math.round(Math.random() * (mask.length - 1))];