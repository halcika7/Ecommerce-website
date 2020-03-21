const cron = require('node-cron');
const productModel = require('../models/Product');

const date = new Date();
date.setDate(date.getDate());
date.setHours(0, 0, 0, 0);

exports.dailyWeeklyOffer = cron
	.schedule(
		'0 0 * * *',
		async () => {
			await productModel.updateMany(
				{ 'dailyOffer.active': true, 'dailyOffer.expires': { $eq: date } },
				{
					$set: { 'options.$[].options.$[].discount': 0 },
					$unset: { dailyOffer: '' }
				}
			);

			await productModel.updateMany(
				{ 'weeklyOffer.active': true, 'weeklyOffer.expires': { $eq: date } },
				{
					$set: { 'options.$[].options.$[].discount': 0 },
					$unset: { weeklyOffer: '' }
				}
			);
		},
		{
			scheduled: true,
			timezone: 'Europe/Sarajevo'
		}
	)
	.start();
