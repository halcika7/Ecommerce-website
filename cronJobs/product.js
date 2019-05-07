const cron = require('node-cron');
const productModel = require('../models/Product');

exports.dailyOffer = cron.schedule('0 0 0 * * *', async () => {
    await productModel.updateMany({ 'dailyOffer.active': true, 'dailyOffer.expires': { $lte: new Date() } }, { $unset: { dailyOffer: '' } });
}).start();

exports.weeklyOffer = cron.schedule('0 0 0 * * *', async () => {
    await productModel.updateMany({ 'weeklyOffer.active': true, 'weeklyOffer.expires': { $lte: new Date() } }, { $unset: { weeklyOffer: '' } });
}).start();