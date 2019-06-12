import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const getAllOrders = callBack => async dispatch => {
	dispatch({ type: actionTypes.ORDER_START });
	const token = localStorage.jwtToken;
	const response = await axios.get('/order/allorders', {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.orders) {
		dispatch({ type: actionTypes.ORDER_SUCCESS, orders: response.data.orders });
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const getAllUserOrders = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.ORDER_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(`/order/userorders?id=${id}`, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.orders) {
		dispatch({
			type: actionTypes.ORDER_SUCCESS,
			userOrders: response.data.orders
		});
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const getOrder = (id, callBack) => async dispatch => {
	const token = localStorage.jwtToken;
	const response = await axios.get(`/order/order?id=${id}`, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.order) {
		dispatch({ type: actionTypes.ORDER_SUCCESS, order: response.data.order });
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const deleteUserOrder = (id, userId, callBack) => async dispatch => {
	const token = localStorage.jwtToken;
	const response = await axios.patch(
		`/order/deleteuserorder?id=${id}&userId=${userId}`,
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.orders) {
		dispatch({
			type: actionTypes.ORDER_SUCCESS,
			successMessage: response.data.successMessage,
			userOrders: response.data.orders
		});
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const deleteOrder = (id, callBack) => async dispatch => {
	const token = localStorage.jwtToken;
	const response = await axios.delete(`/order/deleteorder?id=${id}`, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.orders) {
		dispatch({
			type: actionTypes.ORDER_SUCCESS,
			successMessage: response.data.successMessage,
			orders: response.data.orders
		});
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const updateOrder = (id, value, callBack) => async dispatch => {
	const token = localStorage.jwtToken;
	const response = await axios.patch(
		`/order/updateorder?id=${id}&value=${value}`,
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
			type: actionTypes.ORDER_SUCCESS,
			successMessage: response.data.successMessage
		});
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};
