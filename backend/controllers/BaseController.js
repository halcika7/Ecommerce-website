class BaseController {
    constructor(ChildClass) {
      if (!!ChildClass.instance) {
        return ChildClass.instance;
      }
  
      ChildClass.instance = this;
  
      return this;
    }
  
    sendResponseWithError(res, status, error) {
      return res.status(status).json({ error });
    }
  
    sendResponseWithMessage(res, status, resObj, failedMessage) {
      if (failedMessage) {
        return res.status(status).json({ failedMessage });
      }
  
      return res.status(status).json(resObj);
    }
  
    sendResponse(res, status, resObj) {
      return res.status(status).json(resObj);
    }
  
    getAuthorizationHeader(req) {
      return req.headers.authorization.split(' ')[1] || null;
    }
  }
  
  module.exports = BaseController;