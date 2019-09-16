import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import AddReview from './AddReview/AddReview';
import openSocket from 'socket.io-client';
import Comment from '../../components/Comment/Comment';

const DescriptionAndReviews = props => {
	const productID = props.match.params.id
		? props.match.params.id
		: new URLSearchParams(props.location.search).get('id');

	const [productReviews, setProductReviews] = useState([]);

	useEffect(() => {
		props.getReviews(props.product._id);
		// const socket = openSocket('http://localhost:5000');
		const socket = openSocket('https://still-waters-45697.herokuapp.com');
		socket.on('review', data => {
			if (data.action === 'create') {
				props.updateAddReview(data.review);
			}
			if (data.action === 'deleteReview') {
				props.updateDeleteReview(data.id);
			}
			if (data.action === 'deleteReply') {
				props.updateDeleteReply(data.ids);
			}
			if (data.action === 'editReview' || data.action === 'editReply') {
				props.updateEditReview(data.review);
			}
			if (data.action === 'reply') {
				props.updateAddReply(data.review);
			}
		});
		return () => socket.disconnect();
	}, []);

	useEffect(() => {
		if (props.reviews.length > 0 || props.reviews.length === 0) {
			const newReviews = props.reviews.filter(
				review => review.productId === productID && review
			);
			setProductReviews(newReviews);
		}
	}, [props.reviews]);

	useEffect(() => {
		props.getReviews(props.product._id);
	}, [props.product]);

	return (
		<div className="container-fluid about-product">
			<ul className="nav nav-tabs" id="myTab" role="tablist">
				<li className="nav-item">
					<a
						className="nav-link"
						id="home-tab"
						data-toggle="tab"
						href="#home"
						role="tab"
						aria-controls="home"
						aria-selected="false">
						Description
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link active"
						id="contact-tab"
						data-toggle="tab"
						href="#contact"
						role="tab"
						aria-controls="contact"
						aria-selected="true">
						Reviews
					</a>
				</li>
			</ul>
			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade"
					id="home"
					role="tabpanel"
					aria-labelledby="home-tab">
					<div className="container">
						<div className="row">
							<div
								className="col description"
								dangerouslySetInnerHTML={{ __html: props.product.description }}
							/>
						</div>
					</div>
				</div>
				<div
					className="tab-pane fade show active"
					id="contact"
					role="tabpanel"
					aria-labelledby="contact-tab">
					<div className="container">
						<AddReview productId={props.product._id} push={props.push} />
						<div className="row comments" style={{ margin: '0px' }}>
							<div className="blog-post-comments">
								<ol className="blog-comment">
									{productReviews.map((review, index) => (
										<Comment
											review={review}
											key={index}
											userId={props.userId}
											addReply={props.addReply}
											deleteReview={props.deleteReview}
											deleteReply={props.deleteReply}
											editReview={props.editReview}
											editReply={props.editReply}
											push={props.push}
										/>
									))}
								</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		reviews: state.reviews.productReviews,
		userId: state.login.User.id
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getReviews: id => dispatch(actions.getReviews(id)),

		addReply: (replyObject, callBack) => dispatch(actions.addReply(replyObject, callBack)),

		editReview: (reviewObject, callBack) => dispatch(actions.editReview(reviewObject, callBack)),

		editReply: (reviewObject, callBack) => dispatch(actions.editReply(reviewObject, callBack)),

		deleteReview: (id, callBack) => dispatch(actions.deleteReview(id, callBack)),

		deleteReply: (id, callBack) => dispatch(actions.deleteReply(id, callBack)),

		clearReviews: () => dispatch(actions.clearReviews()),
		updateAddReview: data => dispatch(actions.updateAddReview(data)),
		updateEditReview: data => dispatch(actions.updateEditReview(data)),
		updateDeleteReview: id => dispatch(actions.updateDeleteReview(id)),
		updateDeleteReply: id => dispatch(actions.updateDeleteReply(id)),
		updateAddReply: data => dispatch(actions.updateAddReply(data))
	};
};

export default React.memo(connect(
	mapStateToProps,
	mapDispatchToProps
)(DescriptionAndReviews));
