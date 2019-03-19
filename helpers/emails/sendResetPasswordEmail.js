const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const secret = require('../../config/keys').secretOrKey;
const sendgridTransport = require('nodemailer-sendgrid-transport');

const resetEmail = require('../../views/emails/ResetPassword').resetEmail;
const activationEmail = require('../../views/emails/ConfimAccountEmail').confirmAccountEmail;

const UserModel = require('../../models/User');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.sendActivationLink = async (user, token) => {
    const sendMail = await transporter.sendMail({
        to: user.email,
        from: 'halcikastore@customer.service.com',
        subject: 'Activation Account Email',
        html: activationEmail(user.username, token),
        attachments: [{
            filename: 'img3.png',
            path: '../Portfolio/public/halcstore.png',
            cid: 'imageIcon'
        }]
    });
} 

exports.sendResetPasswordEmail = async (userMail,userName, errors, res) => {
    try{
        
        const payload = {
            email: userMail,
            username: userName
        }

        const token = await jwt.sign(payload,secret,{ expiresIn: 86400 });

        const expiresIn = Date.now() + 86400000;

        const user = await UserModel.updateOne({email: userMail}, {
            resetPassword: {
                token,
                expiresIn
            }
        });

        const sendMail = await transporter.sendMail({
            to: userMail,
            from: 'halcikastore@customer.service.com',
            subject: 'Reset Password',
            html: resetEmail(userName, 'Bearer ' + token),
            attachments: [{
                filename: 'img3.png',
                path: '../Portfolio/public/halcstore.png',
                cid: 'imageIcon'
            }]
        });

        const response = {
            sendMail,
            token: 'Bearer ' + token
        }

        return res.json(response);

    }catch(err) {
        errors.errors.email = 'Reset email was not sent because of ' + err;
        return res.json(errors);
    }
}