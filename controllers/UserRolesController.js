const UserRolesModel = require('../models/UserRole');
const UserModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const validateRole = require('../validation/roleValidation');

exports.addUserRole = async (req, res) => {
    try{
        const {failedMessage, isValid} = validateRole(req.body.name);
        if(!isValid) {return res.json(failedMessage);}
        const newRole = new UserRolesModel({ 
            name: req.body.name,
            isAdmin: req.body.isAdmin,
            permissions: req.body.permissions
        });
        await newRole.save();
        return res.json({ successMessage: 'New Role Added !' });
    }catch(err) {
        return res.json({ failedMessage: err.errmsg });
    }
}

exports.getRoles = async (req,res) => {
    try{
        const roles = await UserRolesModel.find({});
        const user = await UserModel.find({ role: {"$ne": new ObjectId('5c65ed491c9d440000b29bf4')} })
        return res.json(roles);
    }catch(err) {
        console.log(err)
    }
}