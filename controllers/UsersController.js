const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const fs = require('fs-extra');
const ObjectId = require('mongoose').Types.ObjectId; 
const UserModel = require('../models/User');
const UserRolesModel = require('../models/UserRole');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validatePasswords = require('../validation/checkpassword');
const sendActivationEmail = require('../controllers/EmailController').sendActivationEmail;
const getTokenEXP = require('../helpers/getTokenEXP').getDecodedTokenEXP;

//catch 
exports.registerUser = async (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid) {return res.json(errors);}

    try{
        const user = await UserModel.find({$or:[{ email: req.body.email}, {username: req.body.username }]})

        if(user.length > 0) {
            (user[0].email || user[1].email) === req.body.email ? errors.errors.email = 'Email already in use !' : null;
            (user[0].username || user[1].username) === req.body.username ? errors.errors.username = 'Username already in use!' : null;
            return res.json(errors);
        }

        const jwtToken = await jwt.sign({email: req.body.email},secret,{ expiresIn: 86400 });

        const userRoles = await UserRolesModel.findOne({name: 'User'});

        const hash = await bcrypt.hash(req.body.password,10);
        
        const addNewUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            role: userRoles._id,
            username: req.body.username,
            password: hash,
            emailConfirmation: {
                token: 'Bearer ' + jwtToken,
                tokenExparation: new Date(getTokenEXP(jwtToken)),
                confirmed: false
            }
        });

        await addNewUser.save();

        sendActivationEmail(addNewUser, `Bearer ${jwtToken}`);

        return res.json({ 
            message: `Please ${addNewUser.username} go to your Email and confirm your email address in order to log in.`, 
            addNewUser,
            token: 'Bearer ' + jwtToken
        })
    } catch(err) {
        return res.json({ failedMessage: err.message });
    }

}
// catch using $or
exports.loginUser = async (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) { return res.json(errors); }

    const usernameEmail = req.body.usernameEmail, password = req.body.password;
    const expiresIn = req.body.rememberMe ? null : { expiresIn: 3600 };

    try {

        const user = await UserModel.findOne({$or:[{ email: usernameEmail}, {username: usernameEmail }]});

        if(!user) { errors.errors.usernameEmail = 'User not found with that Email or Username'; return res.json(errors);}

        if(!user.emailConfirmation.confirmed) return res.json({ failedMessage: 'Please confirm your email address we have send you an email with activation link' });

        const role = await UserRolesModel.findOne({ _id: user.role });

        const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: role.isAdmin,
            role,
            profilePicture: user.profilePicture,
            rememberMe: req.body.rememberMe
        }

        const byCrypt = await bcrypt.compare(password, user.password);

        if(!byCrypt) { errors.errors.password = 'Password is incorrect'; return res.json(errors); }

        const jwtToken = await jwt.sign(payload,secret,expiresIn);

        return res.json({ success: true, token: 'Bearer ' + jwtToken, rememberMe: req.body.rememberMe, successMessage: `You are successfully logged in as ${user.username}` });

    } catch(err) {
        return res.json({ failedMessage: err.message });
    }
}
// catch
exports.resetPassword = async (req, res) => {
    const {errors, isValid} = validatePasswords(req.body);
    if(!isValid) { return res.json(errors); }

    try{
        const user = await UserModel.findOne({ email: req.body.email });
        const expiresIn = new Date(user.resetPassword.expiresIn).getTime();

        if(expiresIn < Date.now()) {
            errors.errors.expiredToken = 'Token has expired please make request again !!';
            return res.json(errors);
        }

        const byCrypt = await bcrypt.compare(req.body.password, user.password);

        if(byCrypt) { return res.json({ successMessage: 'Provided password is already in use'}); }
    
        const hash = await bcrypt.hash(req.body.password,10);

        await UserModel.updateOne({email: req.body.email}, { resetPassword: {}, password: hash });

        return res.json({ successMessage: 'Password has bees successfuly changed'});
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }

}
// catch
exports.updateProfilePicture = async (req, res) => {
    try{
        if(!req.file){ return res.json({ failedMessage: 'Attached file is not an image.' }); }

        const user = await UserModel.findOne({username: req.body.username});

        if(user.profilePicture === req.file.path) { return res.json({ failedMessage: 'Selected picture is same as the one u already use !' }); }
        if(user.profilePicture !== ''){ await fs.remove(`${user.profilePicture}`) }

        await UserModel.updateOne({username: req.body.username}, { profilePicture: req.file.path });

        const updatedUser = await UserModel.findOne({username: req.body.username});
        const role = await UserRolesModel.findOne({ _id: updatedUser.role });
        const expiresIn = req.body.rememberMe === true ? null : { expiresIn: 3600 };

        const userInfo = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            username: updatedUser.username,
            isAdmin: role.isAdmin,
            role,
            profilePicture: updatedUser.profilePicture,
            rememberMe: req.body.rememberMe
        }

        const jwtToken = await jwt.sign(userInfo,secret,expiresIn);

        return res.json({ token: 'Bearer ' + jwtToken, user: userInfo, successMessage: 'Profile Picture is successfuly updated !' });

    }catch (err) {
        return res.json({ failedMessage: err.message })
    }
}
// catch
exports.updatePassword = async (req, res) => {
    const {errors, isValid} = validatePasswords(req.body);
    if(!isValid) { return res.json(errors); }

    try{
        const user = await UserModel.findOne({ username: req.body.username });
        const byCrypt = await bcrypt.compare(req.body.password, user.password);

        if(byCrypt) { return res.json({ failedMessage: 'Provided password is already in use'}); }

        const hashPwd = await bcrypt.hash(req.body.password,10);
        await UserModel.updateOne({username: req.body.username}, {password: hashPwd});

        return res.json({successMessage: 'Password has bees successfuly changed!'});
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}
// catch
exports.getAllUsers = async (req, res) => {
    try{
        const users = await UserModel.find().select('name _id username email profilePicture');
        return res.json({ users, successMessage: "Users are loaded" });
    }catch (err){
        return res.json({ failedMessage: err.message });
    }
}
// catch
exports.getSingleUser = async (req, res) => {
    try{
        const user = await UserModel.findOne({_id: new ObjectId(req.query.id)}).select('profilePicture name email role username userInfo -_id')
        const role = await UserRolesModel.findOne({ _id: user.role }).select('isAdmin name permissions -_id');
        return res.json({ user, role, successMessage: 'User Successfully loaded !' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}
// catch
exports.deleteUser = async (req, res) => {
    try{
        await UserModel.deleteOne({ _id: new ObjectId(req.query.id) });
        return res.json({ successMessage: 'User successfully deleted !!!' });
    }catch(err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.addEmployeeUser = async (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid) return res.json(errors);

    try{
        const user = await UserModel.find({$or:[{ email: req.body.email}, {username: req.body.username }]})

        if(user.length > 0) {
            (user[0].email || user[1].email) === req.body.email ? errors.errors.email = 'Email already in use !' : null;
            (user[0].username || user[1].username) === req.body.username ? errors.errors.username = 'Username already in use!' : null;
            return res.json(errors);
        }

        const userRoles = await UserRolesModel.findOne({name: 'User'});
        const hash = await bcrypt.hash(req.body.password,10);

        const addNewUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            role: userRoles._id,
            username: req.body.username,
            password: hash,
            emailConfirmation: {
                token: "",
                tokenExparation: null,
                confirmed: true
            }
        });

        await addNewUser.save();
        return res.json({ message: `Please ${addNewUser.username} go to your Email and confirm your email address in order to log in.` });
    } catch(err) {
        errors.errors.email = err;
        return res.json({ failedMessage: err.message });
    }
}
