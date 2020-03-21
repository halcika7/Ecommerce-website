const BaseService = require('./BaseService');

const { confirmAccountEmail } = require('../views/emails/ConfimAccountEmail');
const transporter = require('../config/nodeMailer');

class EmailService extends BaseService {
  constructor() {
    super(EmailService);
  }

  async sendActivationEmail(user, token, password = null) {
    await transporter.sendMail({
      to: user.email,
      from: 'halcikastore@customer.service.com',
      subject: 'Activation Account Email',
      html: confirmAccountEmail(user.username, token, user.email, password)
    });
  }
}

const EmailServiceInstance = new EmailService();

module.exports = EmailServiceInstance;
