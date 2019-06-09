import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addCoupon = data => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const response = await axios.post('/cart/coupon/addcoupon', data);

	if (response.data.successMessage) {
		dispatch({
			type: actionTypes.COUPON_SUCCESS,
			successMessage: response.data.successMessage
		});
	} else if (response.data.errors) {
		dispatch({
			type: actionTypes.COUPON_FAILED,
			errors: response.data.errors,
			couponData: data
		});
	} else {
		dispatch({
			type: actionTypes.COUPON_FAILED,
			failedMessage: response.data.failedMessage,
			couponData: data
		});
	}
};

export const deleteCoupon = id => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const response = await axios.delete('/cart/coupon/deletecoupon?id=' + id);
	if (response.data.successMessage) {
		dispatch({
			type: actionTypes.COUPON_SUCCESS,
			successMessage: response.data.successMessage,
			coupons: response.data.coupons
		});
	} else {
		dispatch({
			type: actionTypes.COUPON_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const getCoupons = () => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const response = await axios.get('/cart/coupon/getcoupons');
	if (response.data.coupons) {
		dispatch({
			type: actionTypes.COUPON_SUCCESS,
			coupons: response.data.coupons
		});
	} else {
		dispatch({
			type: actionTypes.COUPON_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};
