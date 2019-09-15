import React from 'react';

const ProductReview = ({ inStock, numberInStock, rating }) => {
	return (
		<div className="review">
			<div className="stars">
				<div
					className={
						rating.averageRating === 0 ? 'star' : 'star-' + rating.averageRating
					}>
					<i className="fa fa-star" />
					<i className="fa fa-star" />
					<i className="fa fa-star" />
					<i className="fa fa-star" />
					<i className="fa fa-star" />
				</div>
				<p>
					{rating.numberOfReviews === 1
						? rating.numberOfReviews + ' review'
						: rating.numberOfReviews + ' reviews'}
				</p>
			</div>
			<span className="availability">
				<span
					className={
						inStock && numberInStock ? 'badge valid' : 'badge notvalid'
					}>
					{inStock && numberInStock
						? numberInStock + ' In Stock'
						: 'Out of stock'}
				</span>
			</span>
		</div>
	);
};

export default React.memo(ProductReview);
