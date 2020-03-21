const BaseService = require('./BaseService');
const User = require('../models/User');

const { getTokenEXP } = require('../helpers/getTokenEXP');

class UserService extends BaseService {
  constructor() {
    super(UserService);
  }

  async findOneByEmail(email) {
    return await User.findOne({ email });
  }

  async activateUser(email) {
    return await User.updateOne(
      { email },
      { token: '', tokenExparation: null, confirmed: true }
    );
  }

  async updateActivationLink(email, token) {
    return await User.findOneAndUpdate(
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
