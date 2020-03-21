const ObjectId = require('mongoose').Types.ObjectId;
const ProductReviewModel = require('../models/ProductReview');
const ProductModel = require('../models/Product');
const UserModel = require('../models/User');

exports.addReview = async (req, res, next, socket) => {
	const productId = req.body.productId,
		userId = req.body.userId,
		text = req.body.text,
		rating = req.body.rating;
	try {
		if (!userId) {
			return res.json({ failedMessage: 'You are not logged in' });
		}
		const ifExists = await ProductReviewModel.findOne({
			productId,
			userId: new ObjectId(userId)
		});
		if (ifExists) {
			return res.json({ failedMessage: 'You already added review!' });
		}

		const addReview = new ProductReviewModel({
			productId,
			userId: new ObjectId(userId),
			rating,
			text
		});

		await addReview.save();

		const { avg, numOfReviews } = await numberOfReviewsHelper(productId);

		await ProductModel.updateOne(
			{ _id: new ObjectId(productId) },
			{
				rating: {
					averageRating: Math.floor(avg),
					numberOfReviews: numOfReviews
				}
			}
		);

		const findReview = await ProductReviewModel.findOne({
			userId: new ObjectId(userId),
			productId
		})
			.populate({ path: 'userId', populate: { path: 'userId' } })
			.populate({ path: 'replys.reviewId', populate: { path: 'reviewId' } })
			.populate({ path: 'replys.userId', populate: { path: 'userId' } });
		socket.broadcast.emit('review', { action: 'create', review: findReview });

		return res.json({ successMessage: 'Review Added !', product: true });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.getReviews = async (req, res) => {
	const productId = req.query.id;
	try {
		const findReviews = await ProductReviewModel.find({ productId })
			.populate({ path: 'userId', populate: { path: 'userId' } })
			.populate({
				path: 'replys.reviewId',
				populate: {
					path: 'reviewId'
				}
			})
			.populate({
				path: 'replys.userId',
				populate: {
					path: 'userId'
				}
			});
		const productRatings = await numberOfReviewsHelper(productId);

		return res.json({ findReviews, productRatings });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.addReply = async (req, res, next, socket) => {
	const reviewId = req.body.reviewId;
	const text = req.body.text;
	const userId = req.body.userId;

	try {
		if (!userId) {
			return res.json({ failedMessage: 'You are not logged in' });
		}
		const addReview = new ProductReviewModel({
			text,
			userId: new ObjectId(userId)
		});

		await addReview.save();

		await ProductReviewModel.updateOne(
			{ _id: new ObjectId(reviewId) },
			{
				$push: {
					replys: {
						reviewId: new ObjectId(addReview._id),
						userId: new ObjectId(userId)
					}
				}
			}
		);

		const reply = await ProductReviewModel.findOne({
			_id: new ObjectId(addReview._id)
		}).populate({ path: 'userId', populate: { path: 'userId' } });

		const findReview = {
			reviewId: {
				createdAt: reply.createdAt,
				dislikes: reply.dislikes,
				likes: reply.likes,
				replys: reply.replys,
				text: reply.text,
				updatedAt: reply.updatedAt,
				_id: reply._id
			},
			userId: {
				username: reply.userId.username,
				profilePicture: reply.userId.profilePicture,
				_id: reply.userId._id
			}
		};
		socket.broadcast.emit('review', {
			action: 'reply',
			review: { findReview, reviewId }
		});
		return res.json({ successMessage: 'Reply Added' });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteReview = async (req, res, next, socket) => {
	const id = req.query.id;
	const userId = req.query.userId;
	const productId = req.query.productId;
	try {
		const findUser = await UserModel.findOne({ _id: ObjectId(userId) });
		if (!findUser) {
			return res.json({ failedMessage: 'No User with provided id found' });
		}
		const dd = await ProductReviewModel.aggregate([
			{
				$match: {
					_id: new ObjectId(id),
					'replys.reviewId': { $exists: true },
					userId: ObjectId(userId)
				}
			},
			{ $group: { _id: null, reviewIds: { $push: '$replys.reviewId' } } },
			{ $project: { _id: 0, reviewIds: 1 } },
			{ $limit: 1 },
			{ $unwind: '$reviewIds' }
		]);
		if (dd.length > 0) {
			await ProductReviewModel.deleteMany({ _id: { $in: dd[0].reviewIds } });
		}
		await ProductReviewModel.deleteOne({ _id: new ObjectId(id) });
		const { avg, numOfReviews } = await numberOfReviewsHelper(productId);
		await ProductModel.updateOne(
			{ _id: new ObjectId(productId) },
			{
				rating: {
					averageRating: Math.floor(avg),
					numberOfReviews: numOfReviews
				}
			}
		);

		socket.broadcast.emit('review', { action: 'deleteReview', id: id });
		return res.json({ successMessage: 'Review Deleted !', product: productId });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.deleteReply = async (req, res, next, socket) => {
	const id = req.query.id;
	const userId = req.query.userId;
	try {
		const findUser = await UserModel.findOne({ _id: ObjectId(userId) });

		if (!findUser) {
			return res.json({ failedMessage: 'No User with provided id found' });
		}
		const findParent = await ProductReviewModel.findOne({
			'replys.reviewId': ObjectId(id),
			'replys.userId': ObjectId(userId)
		});

		const updateReview = await ProductReviewModel.updateOne(
			{ 'replys.reviewId': ObjectId(id), 'replys.userId': ObjectId(userId) },
			{ $pull: { replys: { reviewId: ObjectId(id) } } }
		);

		if (updateReview.nModified !== 1) {
			return res.json({ failedMessage: 'Nothing deleted' });
		}

		await ProductReviewModel.deleteOne({
			_id: ObjectId(id),
			userId: ObjectId(userId)
		});

		socket.broadcast.emit('review', {
			action: 'deleteReply',
			ids: { parentId: findParent._id, id }
		});

		return res.json({ successMessage: 'Comment Deleted' });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.editReview = async (req, res, next, socket) => {
	try {
		const id = req.query.id,
			text = req.query.text;

		await ProductReviewModel.updateOne({ _id: new ObjectId(id) }, { text });

		const findReview = await ProductReviewModel.findOne({
			_id: new ObjectId(id)
		})
			.populate({ path: 'userId', populate: { path: 'userId' } })
			.populate({ path: 'replys.reviewId', populate: { path: 'reviewId' } })
			.populate({ path: 'replys.userId', populate: { path: 'userId' } });

		socket.broadcast.emit('review', {
			action: 'editReview',
			review: findReview
		});

		return res.json({ findReview });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.editReply = async (req, res, next, socket) => {
	try {
		const id = req.query.id,
			text = req.query.text;
		reviewId = req.query.reviewId;

		await ProductReviewModel.updateOne({ _id: new ObjectId(id) }, { text });

		const findReview = await ProductReviewModel.findOne({
			_id: new ObjectId(reviewId)
		})
			.populate({ path: 'userId', populate: { path: 'userId' } })
			.populate({ path: 'replys.reviewId', populate: { path: 'reviewId' } })
			.populate({ path: 'replys.userId', populate: { path: 'userId' } });

		socket.broadcast.emit('review', {
			action: 'editReply',
			review: findReview
		});

		return res.json({ findReview });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

// likes

// dislikes

const numberOfReviewsHelper = async productId => {
	try {
		const elem = await ProductReviewModel.aggregate([
			{ $match: { productId: productId } },
			{ $group: { _id: '$rating', count: { $sum: 1 } } }
		]);
		if (elem.findIndex(elem => elem._id === 5) === -1) {
			elem.push({ _id: 5, count: 0 });
		}
		if (elem.findIndex(elem => elem._id === 4) === -1) {
			elem.push({ _id: 4, count: 0 });
		}
		if (elem.findIndex(elem => elem._id === 3) === -1) {
			elem.push({ _id: 3, count: 0 });
		}
		if (elem.findIndex(elem => elem._id === 2) === -1) {
			elem.push({ _id: 2, count: 0 });
		}
		if (elem.findIndex(elem => elem._id === 1) === -1) {
			elem.push({ _id: 1, count: 0 });
		}
		elem.sort((a, b) => b._id - a._id);
		const numOfReviews = elem.reduce((acc, val) =>
			Object.keys(acc).length ? acc.count + val.count : acc + val.count
		);
		const totalSumOfRatings = elem.reduce((acc, val) =>
			Object.keys(acc).length
				? acc._id * acc.count + val._id * val.count
				: acc + val._id * val.count
		);
		const avg = parseFloat((totalSumOfRatings / numOfReviews).toFixed(2));
		const ratingsWithPercentages = elem.map(el => ({
			...el,
			percent: (el.count / numOfReviews) * 100
		}));

		return {
			numOfReviews,
			avg: Number.isNaN(avg) ? 0 : avg,
			ratingsWithPercentages
		};
	} catch (err) {
		console.log(err);
	}
};
