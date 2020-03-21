const BaseController = require('./BaseController');
const UserService = require('../services/UserService');
const EmailService = require('../services/EmailService');
const JWTService = require('../services/JWTService');

class ActivateAccountController extends BaseController {
  constructor() {
    super(ActivateAccountController);
  }

  async activateAccount(req, res) {
    try {
      const { email } = req.body;
      const user = await UserService.findOneByEmail(email);

      const expiresIn = new Date(
        user.emailConfirmation.tokenExparation
      ).getTime();

      if (!user) {
        return super.sendResponse(res, 404, {
          failedMessage: 'Failed to find user'
        });
      } else if (expiresIn < Date.now()) {
        return super.sendResponse(res, 400, {
          failedMessage: `${user.username} Token has expired please click button "Send Activation Link"`
        });
      }

      const updateUser = await UserService.activateUser(email);

      if (updateUser.nModified === 0) {
        return super.sendResponse(res, 400, {
          failedMessage: 'Failed to update your email confirmation'
        });
      }

      return super.sendResponse(res, 200, {
        successMessage: `${user.username} you activated account successfully`
      });
    } catch (err) {
      return super.sendResponse(res, 400, {
        failedMessage: err.message
      });
    }
  }

  async resendActivationMail(req, res) {
    try {
      const { email } = req.body;
      const checkUser = await UserService.findOneByEmail(email);

      if (!checkUser) {
        return super.sendResponse(res, 404, {
          failedMessage:
            'Account with that email was not found.Please try again!'
        });
      } else if (checkUser.emailConfirmation.confirmed) {
        return super.sendResponse(res, 400, {
          failedMessage:
            'This Account has been already activated or You mistyped email address!'
        });
      }

      const jwtToken = await JWTService.createToken(email);

      const user = await UserService.updateActivationLink(email, jwtToken);

      if (user.nModified === 0) {
        return super.sendResponse(res, 400, {
          failedMessage: 'Failed to update user email confirmation'
        });
      }

      EmailService.sendActivationEmail(user, 'Bearer ' + jwtToken);

      return super.sendResponse(res, 200, {
        successMessage: `Please ${user.username} go to your Email and confirm your email address in order to log in.`
      });
    } catch (err) {
      return super.sendResponse(res, 400, {
        failedMessage: err.message
      });
    }
  }
}

const ActivateAccountControllerInstance = new ActivateAccountController();

module.exports = ActivateAccountControllerInstance;
