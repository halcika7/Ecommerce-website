const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

const UserModel = require('../models/User');

const sendActivationEmail = require('../controllers/EmailController').sendActivationEmail;

// catch
exports.activateAccount = async (req, res) => {
    try {

        const user = await UserModel.findOne({ email: req.body.email });

        const expiresIn = new Date(user.emailConfirmation.tokenExparation).getTime();
        
        if(expiresIn < Date.now()) {
            return res.json({ failedMessage:  `${user.username} Token has expired please click button "Send Activation Link"`});
        }
        
        await UserModel.updateOne({email: req.body.email}, {
            emailConfirmation: {
                token: '',
                tokenExparation: null,
                confirmed: true
            }
        });
        
        return res.json({ successMessage: `${user.username} you activated account successfully`});
    }catch(err) {
        return res.json({ failedMessage:  err.message });
    }
}

exports.resendActivationMail = async (req, res) => {
    
    try{

        const user = await UserModel.findOne({ email: req.body.email });

        const token = await jwt.sign({email: req.body.email},secret,{ expiresIn: 86400 });

        await UserModel.updateOne({email: user.email}, {
            emailConfirmation: {
                token: 'Bearer ' + token,
                tokenExparation: Date.now() + 86400000,
                confirmed: true
            }
        });

        sendActivationEmail(user.email, 'Bearer ' + token);

        return res.json({ 
            successMessage: `Please ${user.username} go to your Email and confirm your email address in order to log in.`, 
            token: 'Bearer ' + token
        })
    }catch(err){
        return res.json({ failedMessage:  `${err} Token has expired please go to authentication page and click on button "Send Activation Link"`});
    }
}