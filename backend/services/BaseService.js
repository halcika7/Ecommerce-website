// const { decodeToken } = require('../helpers/authHelper');
// const { URL } = require('../config/configs');

module.exports = class BaseService {
  constructor(ChildClass) {
    if (!ChildClass.instance) {
      ChildClass.instance = this;
    }

    return ChildClass.instance;
  }

  returnGenericFailed() {
    return {
      status: 403,
      failedMessage: 'Something happened. We were unable to perform request.'
    };
  }

  returnResponse(status, objectResp) {
    return {
      status,
      ...objectResp
    };
  }

//   decodeAuthorizationToken(token) {
//     return decodeToken(token) || { id: undefined };
//   }

//   redirectAfterLogin(res, { accessToken, message, err }) {
//     if (err) return res.redirect(`${URL}/home/auth/login?err=${err}`);
//     return res.redirect(
//       `${URL}/home/auth/login?token=${accessToken}&message=${message}&remember=${true}`
//     );
//   }
};
