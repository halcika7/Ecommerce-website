const BaseService = require('./BaseService');

const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');

class JWTService extends BaseService {
  constructor() {
    super(JWTService);
  }

  async createToken(email) {
    return await jwt.sign({ email }, secretOrKey, { expiresIn: 86400 });
  }
}

const JWTServiceInstance = new JWTService();

module.exports = JWTServiceInstance;
