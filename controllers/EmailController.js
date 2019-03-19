const UserModel = require('../models/User');
const validateEmail = require('../validation/email');

const sendResetPasswordEmail = require('../helpers/emails/sendResetPasswordEmail');

exports.sendActivationEmail = async (email, token) => {
    try {
        // comment
        const user = await UserModel.findOne({ email });

        sendResetPasswordEmail.sendActivationLink(user, token);
    }catch (err) {
        return res.status(400).json(err);
    }
}

exports.sendResetPasswordEmail = async (req, res) => {

    const {errors, isValid} = validateEmail(req.body);

    if(!isValid) {
        return res.json(errors);
    }

    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user) {
            errors.errors.email = 'User not found with that Email';
            return res.json(errors);
        }
               
        sendResetPasswordEmail.sendResetPasswordEmail(user.email, user.username, errors, res);

    }catch(err) {
        errors.errors.email = err;
        return res.json(errors);
    }
}