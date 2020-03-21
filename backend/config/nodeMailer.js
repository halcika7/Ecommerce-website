const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const secret = require('./keys');

module.exports = nodemailer.createTransport(
  sendgridTransport({ auth: { api_key: secret.sendgridKey } })
);
