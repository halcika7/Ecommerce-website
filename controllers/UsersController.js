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

//catch 
exports.registerUser = async (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid) {return res.json(errors);}

    try{
        let user = await UserModel.findOne({ email: 'req.body.email' });

        if(user) {
            errors.errors.email = 'Email already exists';
            return res.json(errors);
        }

        user = await UserModel.findOne({ username: req.body.username });

        if(user) {
            errors.errors.username = 'Username is already taken';
            return res.json(errors);
        }

        const token = await jwt.sign({email: req.body.email},secret,{ expiresIn: 86400 });

        const userRoles = await UserRolesModel.findOne({name: 'User'});
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err,hash) => {
                if(err) throw err;
                try{
                    const addNewUser = new UserModel({
                        name: req.body.name,
                        email: req.body.email,
                        role: userRoles._id,
                        username: req.body.username,
                        password: hash,
                        emailConfirmation: {
                            token: 'Bearer ' + token,
                            tokenExparation: Date.now() + 86400000,
                            confirmed: false
                        }
                    });

                    await addNewUser.save();

                    console.log(`Bearer ${token}`)

                    sendActivationEmail(addNewUser.email, `Bearer ${token}`);
    
                    return res.json({ 
                        message: `Please ${addNewUser.username} go to your Email and confirm your email address in order to log in.`, 
                        addNewUser,
                        token: 'Bearer ' + token
                    })
                }catch(err) {
                    return res.json({ errorCatched: true, failedMessage: err.message });
                }
            });
        });
    } catch(err) {
        return res.json({ errorCatched: true, failedMessage: err.message });
    }

}

// catch
exports.loginUser = async (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid) { return res.json(errors); }

    const usernameEmail = req.body.usernameEmail, password = req.body.password;
    const criteria = (usernameEmail.indexOf('@') === -1) ? {username: usernameEmail} : {email: usernameEmail};
    const expiresIn = req.body.rememberMe ? null : { expiresIn: 3600 };

    try {

        const user = await UserModel.findOne(criteria);

        if(!user) {
            errors.errors.usernameEmail = 'User not found with that Email or Username';
            return res.json(errors);
        }

        if(!user.emailConfirmation.confirmed) {
            return res.json({ failedMessage: 'Please confirm your email address we have send you an email with activation link' });
        }

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

        if(!byCrypt) {
            errors.errors.password = 'Password is incorrect';
            return res.json(errors);
        }
        const jwtToken = await jwt.sign(payload,secret,expiresIn);

        return res.json({
            success: true,
            token: 'Bearer ' + jwtToken,
            rememberMe: req.body.rememberMe,
            successMessage: `You are successfully logged in as ${user.username}` 
        });

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

        if(byCrypt) {
            return res.json({ successMessage: 'Provided password is already in use'});
        }
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err,hash) => {
                if(err) throw err;
    
                await UserModel.updateOne({email: req.body.email}, {
                    resetPassword: {},
                    password: hash
                });
    
                return res.json({ successMessage: 'Password has bees successfuly changed'});
            });
        });

    }catch(err) {
        return res.json({ failedMessage: err.message });
    }

}

exports.updateProfilePicture = async (req, res) => {
    try{

        if(!req.file){
            return res.json({ failedMessage: 'Attached file is not an image.' });
        }

        const user = await UserModel.findOne({username: req.body.username});

        if(user.profilePicture === req.file.path) {
            return res.json({ failedMessage: 'Selected picture is same as the one u already use !' });
        }

        if(user.profilePicture !== ''){
            await fs.remove(`${user.profilePicture}`)
        }


        await UserModel.updateOne({username: req.body.username}, {
            profilePicture: req.file.path
        });

        const updatedUser = await UserModel.findOne({username: req.body.username});

        const role = await UserRolesModel.findOne({ _id: updatedUser.role });

        const expiresIn = req.body.rememberMe === true ? null : { expiresIn: 3600 };

        const userInfo = {
            id: updatedUser.id,
            name: updatedUser.name,
            username: updatedUser.username,
            isAdmin: role.isAdmin,
            role,
            profilePicture: updatedUser.profilePicture,
            rememberMe: req.body.rememberMe
        }

        const jwtToken = await jwt.sign(userInfo,secret,expiresIn);

        return res.json({
            token: 'Bearer ' + jwtToken,
            user: userInfo,
            successMessage: 'Profile Picture is successfuly updated !'
        });

    }catch (err) {
        return res.json({ failedMessage: err.message })
    }
}

exports.updatePassword = async (req, res) => {
    const {errors, isValid} = validatePasswords(req.body);

    if(!isValid) { return res.json(errors); }

    try{
        const hashPwd = await bcrypt.hash(req.body.password,10);
        await UserModel.updateOne({username: req.body.username}, {password: hashPwd});
        return res.json({successMessage: 'Password has bees successfuly changed!'});

    }catch(err) {
        console.log(err)
        return res.json(errors);
    }

}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await UserModel.find().select('name _id username email profilePicture');

        return res.json(users);
    }catch (err){
        console.log(err)
    }
}

exports.getSingleUser = async (req, res) => {
    try{

        const user = await UserModel.findOne({_id: new ObjectId(req.query.id)}).select('profilePicture name email role username userInfo -_id')

        const role = await UserRolesModel.findOne({ _id: user.role }).select('isAdmin name permissions -_id');

        const payload = {
            ...user._doc,
            role: {
                ...role._doc
            }
        }

        return res.json(payload)

    }catch(err) {
        console.log(err)
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await UserModel.deleteOne({ _id: new ObjectId(req.query.id) });

        return res.json({ successMessage: 'User has been deleted !!!' })

    }catch(err) {
        console.log(err);
    }
}

exports.addEmployeeUser = async (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid) {
        return res.json(errors);
    }

    try{

        let user = await UserModel.findOne({ email: req.body.email });

        if(user) {
            errors.errors.email = 'Email already exists';
            return res.json(errors);
        }

        user = await UserModel.findOne({ username: req.body.username });

        if(user) {
            errors.errors.username = 'Username is already taken';
            return res.json(errors);
        }

        const token = await jwt.sign({email: req.body.email},secret,{ expiresIn: 86400 });

        const userRoles = await UserRolesModel.findOne({name: 'User'});
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err,hash) => {
                if(err) throw err;
                const addNewUser = new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    role: userRoles._id,
                    username: req.body.username,
                    password: hash,
                    emailConfirmation: {
                        token: 'Bearer ' + token,
                        tokenExparation: Date.now() + 86400000,
                        confirmed: false
                    }
                });

                try{
                    await addNewUser.save();

                    sendActivationEmail(addNewUser.email, 'Bearer ' + token);

                    return res.json({ 
                        message: `Please ${addNewUser.username} go to your Email and confirm your email address in order to log in.`, 
                        addNewUser,
                        token: 'Bearer ' + token
                    })
                }catch(err){
                    console.log(err)
                }
            });
        });
    } catch(err) {
        errors.errors.email = err;
        return res.json(errors);
    }

}
