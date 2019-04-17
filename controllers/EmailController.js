const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const validateEmail = require("../validation/email");
const secret = require("../config/keys");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const resetEmail = require("../views/emails/ResetPassword").resetEmail;
const activationEmail = require("../views/emails/ConfimAccountEmail")
  .confirmAccountEmail;
const transporter = nodemailer.createTransport(
  sendgridTransport({ auth: { api_key: secret.sendgridKey } })
);
const getTokenEXP = require("../helpers/getTokenEXP").getDecodedTokenEXP;

exports.sendActivationEmail = async (user, token, password = null) => {
  const mail = await transporter.sendMail({
    to: user.email,
    from: "halcikastore@customer.service.com",
    subject: "Activation Account Email",
    html: activationEmail(user.username, token, user.email, password)
  });
};

exports.sendResetPasswordEmail = async (req, res) => {
  const { errors, isValid } = validateEmail(req.body);
  if (!isValid) return res.json(errors);
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      errors.errors.email = "User not found with that Email";
      return res.json(errors);
    }
    const payload = { email: user.email, username: user.username };
    const jwtToken = await jwt.sign(payload, secret.secretOrKey, {
      expiresIn: 86400
    });
    await UserModel.updateOne(
      { email: user.email },
      {
        resetPassword: {
          token: "Bearer " + jwtToken,
          expiresIn: new Date(getTokenEXP(jwtToken))
        }
      }
    );
    await transporter.sendMail({
      to: user.email,
      from: "halcikastore@customer.service.com",
      subject: "Reset Password",
      html: resetEmail(user.username, "Bearer " + jwtToken),
      attachments: [
        {
          filename: "img3.png",
          path: "../Portfolio/public/halcstore.png",
          cid: "imageIcon"
        }
      ]
    });
    return res.json({
      successMessage:
        user.username + " we have send you email with reset password link!",
      token: "Bearer " + jwtToken
    });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};
