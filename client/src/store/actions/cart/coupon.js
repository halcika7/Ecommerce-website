import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addCoupon = (data, callBack) => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const token = localStorage.jwtToken;
	const response = await axios.post('/cart/coupon/addcoupon', data, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

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

export const deleteCoupon = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete(`/cart/coupon/deletecoupon?id=${id}`, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
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

export const getCoupons = callBack => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const token = localStorage.jwtToken;
	const response = await axios.get('/cart/coupon/getcoupons', {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
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

export const getCoupon = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(`/cart/coupon/getcoupon?id=${id}`, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.coupon) {
		dispatch({
			type: actionTypes.COUPON_SUCCESS,
			couponData: response.data.coupon
		});
	} else {
		dispatch({
			type: actionTypes.COUPON_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const updateCoupon = (
	id,
	type,
	expiresIn,
	value,
	callBack
) => async dispatch => {
	dispatch({ type: actionTypes.COUPON_START });
	const token = localStorage.jwtToken;
	const response = await axios.patch(
		`/cart/coupon/updatecoupon?id=${id}&type=${type}&expiresIn=${expiresIn}&value=${value}`,
		null,
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.successMessage) {
		dispatch({
			type: actionTypes.COUPON_SUCCESS,
			couponData: response.data.coupon,
			successMessage: response.data.successMessage
		});
	} else {
		dispatch({
			type: actionTypes.COUPON_FAILED,
			failedMessage: response.data.failedMessage,
			couponData: response.data.coupon
		});
	}
};
