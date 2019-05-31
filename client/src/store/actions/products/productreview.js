import * as actionTypes from '../actionTypes';
import { getProduct } from '../../actions';
import axios from 'axios';

export const addReview = reviewObject => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.post('/products/product/addreview', reviewObject);
	dispatch(responseHelper(response));
	if(response.data.product) {
		dispatch(getProduct(reviewObject.productId))
	}
};

export const editReview = ({ id, text }) => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.patch(`/products/product/editreview?id=${id}&text=${text}`);
	dispatch(responseHelper(response));
};

export const deleteReview = ({ id, userId, productId }) => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.delete(`/products/product/deletereview?id=${id}&userId=${userId}&productId=${productId}`);
	dispatch(responseHelper(response));
	if(response.data.product) {
		dispatch(getProduct(response.data.product))
	}
};

export const addReply = replyObject => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.post('/products/product/addreply', replyObject);
	dispatch(responseHelper(response));
};

export const editReply = ({ id, text, reviewId }) => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.patch(`/products/product/editreply?id=${id}&text=${text}&reviewId=${reviewId}`);
	dispatch(responseHelper(response));
};

export const deleteReply = ({ id, userId }) => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.delete(`/products/product/deletereply?id=${id}&userId=${userId}`);
	dispatch(responseHelper(response));
};

export const getReviews = productId => async dispatch => {
	dispatch({ type: actionTypes.REVIEW_START });
	const response = await axios.get('/products/product/getReviews?id='+ productId);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.REVIEW_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.REVIEW_SUCCESS,
			productReviews: response.data.findReviews,
			productRatings: response.data.productRatings
		});
	}
};

export const updateAddReview = data => async dispatch => {
	dispatch({
		type: actionTypes.REVIEW_SUCCESS,
		updateAddReview: data
	});
}

export const updateEditReview = data => async dispatch => {
	dispatch({
		type: actionTypes.REVIEW_SUCCESS,
		updateEditReview: data
	});
}

export const updateDeleteReview = id => async dispatch => {
	dispatch({
		type: actionTypes.REVIEW_SUCCESS,
		updateDeleteReview: id
	});
}

export const updateAddReply = data => async dispatch => {
	dispatch({
		type: actionTypes.REVIEW_SUCCESS,
		updateAddReply: data
	});
}

export const updateDeleteReply = id => async dispatch => {
	dispatch({
		type: actionTypes.REVIEW_SUCCESS,
		updateDeleteReply: id
	});
}

export const clearReviews = () => async dispatch => {
	dispatch({
		type: actionTypes.REVIEW_SUCCESS,
		clear: true
	});
}

const responseHelper = response => async dispatch => {
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.REVIEW_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.REVIEW_SUCCESS,
			successMessage: response.data.successMessage
		});
	}
}
