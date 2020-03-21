const BaseService = require('./BaseService');
const UserModel = require('../models/User');

const { getTokenEXP } = require('../helpers/getTokenEXP');

class UserService extends BaseService {
  constructor() {
    super(UserService);
  }

  async findOneByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async activateUser(email) {
    return await UserModel.updateOne(
      { email },
      { token: '', tokenExparation: null, confirmed: true }
    );
  }

  async updateActivationLink(email, token) {
    return await UserModel.findOneAndUpdate(
      { email },
      {
        emailConfirmation: {
          token: 'Bearer ' + token,
          tokenExparation: new Date(getTokenEXP(token)),
          confirmed: false
        }
      }
    );
  }
}

const UserServiceInstance = new UserService();

module.exports = UserServiceInstance;
