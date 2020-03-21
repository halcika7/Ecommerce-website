const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductReviewSchema = new Schema(
	{
		productId: {
			type: String
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true
		},
		replys: [
			{
				reviewId: {
					type: Schema.Types.ObjectId,
					ref: 'reviews'
				},
				userId: {
					type: Schema.Types.ObjectId,
					ref: 'users'
				}
			}
		],
		rating: {
			type: Number,
			min: 1,
			max: 5
		},
		text: {
			type: String,
			required: true
		},
		likes: [
			{
				userId: String
			}
		],
		dislikes: [
			{
				userId: String
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = ProductReview = mongoose.model('reviews', ProductReviewSchema);
