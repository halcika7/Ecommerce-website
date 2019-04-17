const jwt = require("jsonwebtoken");
const secret = require("../config/keys").secretOrKey;
const UserModel = require("../models/User");
const sendActivationEmail = require("../controllers/EmailController")
  .sendActivationEmail;
const getTokenEXP = require("../helpers/getTokenEXP").getDecodedTokenEXP;

exports.activateAccount = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    const expiresIn = new Date(
      user.emailConfirmation.tokenExparation
    ).getTime();

    if (expiresIn < Date.now())
      return res.json({
        failedMessage: `${
          user.username
        } Token has expired please click button "Send Activation Link"`
      });

    await UserModel.updateOne(
      { email: req.body.email },
      {
        emailConfirmation: {
          token: "",
          tokenExparation: null,
          confirmed: true
        }
      }
    );
    return res.json({
      successMessage: `${user.username} you activated account successfully`
    });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.resendActivationMail = async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) {
      if (checkUser.emailConfirmation.confirmed)
        return res.json({
          failedMessage:
            "This Account has been already activated or You mistyped email address!"
        });
      const jwtToken = await jwt.sign({ email: req.body.email }, secret, {
        expiresIn: 86400
      });
      const user = await UserModel.findOneAndUpdate(
        { email: checkUser.email },
        {
          emailConfirmation: {
            token: "Bearer " + jwtToken,
            tokenExparation: new Date(getTokenEXP(jwtToken)),
            confirmed: false
          }
        }
      );
      sendActivationEmail(user, "Bearer " + jwtToken);
      return res.json({
        successMessage: `Please ${
          user.username
        } go to your Email and confirm your email address in order to log in.`
      });
    } else {
      return res.json({
        failedMessage: "Account with that email was not found.Please try again!"
      });
    }
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};
