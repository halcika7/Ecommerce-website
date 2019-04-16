const UserRolesModel = require('../models/UserRole');
const UserModel = require('../models/User');
const validateRole = require('../validation/roleValidation');
const ObjectId = require('mongoose').Types.ObjectId; 

exports.addUserRole = async (req, res) => {
    try{
        const {failedMessage, isValid} = validateRole(req.body.name);
        if(!isValid) {return res.json(failedMessage);}
        const newRole = new UserRolesModel({ 
            name: req.body.name, 
            isAdmin: req.body.isAdmin, 
            permissions: req.body.permissions});
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

exports.deleteUserRole = async (req, res) => {
    try {
        const findRole = await UserRolesModel.findOne({ $and: [ { _id: {$in: ['5cb604f564f027438f85970a','5cb604fd64f027438f85970b']} }, {  _id: new ObjectId(req.query.id) } ] });
        const deleteRole = await UserRolesModel.deleteOne({ $and: [ { _id: {$nin: ['5cb604f564f027438f85970a','5cb604fd64f027438f85970b']} }, {  _id: new ObjectId(req.query.id) } ] });
        const updateUserRole = await UserModel.updateMany({ role: req.query.id }, { role: new ObjectId('5cb604fd64f027438f85970b') });
        if(deleteRole.n === 0 && findRole) { return res.json({ failedMessage: `Role with id = ${findRole._id} can't be deleted !` }); } 
        if(deleteRole.n === 0) return res.json({ failedMessage: 'No Roles deleted !' });
        return res.json({ successMessage: 'Role deleted !' });
    }catch (err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.deleteManyUserRoles = async (req, res) => {
    const ids = Object.keys(req.query).map(id => req.query[id]);
    try {
        const findRole = await UserRolesModel.find({ $and: [ { _id: {$in: ['5cb604f564f027438f85970a','5cb604fd64f027438f85970b']} }, {  _id: {$in: ids} } ] });
        const deleteRole = await UserRolesModel.deleteMany({ $and: [ { _id: {$nin: ['5cb604f564f027438f85970a','5cb604fd64f027438f85970b']} }, {  _id: {$in: ids}  } ] });
        const updateUserRole = await UserModel.updateMany({ role: {$in: ids} }, { role: new ObjectId('5cb604fd64f027438f85970b') });
        if(deleteRole.n === 0 && findRole) { return res.json({ failedMessage: `Role with id = ${findRole._id} can't be deleted !` }); } 
        if(deleteRole.n === 0) return res.json({ failedMessage: 'No Roles deleted !' });
        return res.json({ successMessage: 'Role deleted !' });
    }catch (err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.getRole = async (req, res) => {
    try{
        const response = await UserRolesModel.findById(req.body.id).select('isAdmin permissions name');
        if(!response) { return res.json({ error: `Role with id = ${req.body.id} was not found !` }) }
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
        if(findByName && !findByName._id.equals(findById._id) && findByName.name !== findById.name) { return res.json({ failedMessage: 'Name Already in use' }); }
        await UserRolesModel.updateOne({ _id: req.body.id }, { name: req.body.name, isAdmin: req.body.isAdmin, permissions: req.body.permissions });
        const updatedRole = await UserRolesModel.findById(req.body.id);
        return res.json({ successMessage: 'Role updated!' , role: updatedRole});
    }catch(err) {
        const message = err.message ? err.message : err.CastError;
        return res.json({ failedMessage: message });
    }
}