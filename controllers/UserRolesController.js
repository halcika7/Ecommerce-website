const UserRolesModel = require('../models/UserRole');
const UserModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId; 

exports.getRoles = async (req,res) => {
    try{
        const roles = await UserRolesModel.find({});

        const user = await UserModel.find({ role: {"$ne": new ObjectId('5c65ed491c9d440000b29bf4')} })

        return res.json(roles);

    }catch(err) {
        console.log(err)
    }
}