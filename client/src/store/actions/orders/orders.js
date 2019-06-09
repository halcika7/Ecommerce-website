import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getAllOrders = () => async dispatch => {
	dispatch({ type: actionTypes.ORDER_START });
	const response = await axios.get('/order/allorders');
	if (response.data.orders) {
		dispatch({ type: actionTypes.ORDER_SUCCESS, orders: response.data.orders });
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const getAllUserOrders = id => async dispatch => {
	dispatch({ type: actionTypes.ORDER_START });
	const response = await axios.get('/order/userorders?id=' + id);
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

export const getOrder = id => async dispatch => {
	const response = await axios.get('/order/order?id=' + id);
	if (response.data.order) {
		dispatch({ type: actionTypes.ORDER_SUCCESS, order: response.data.order });
	} else {
		dispatch({
			type: actionTypes.ORDER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};

export const deleteUserOrder = (id, userId) => async dispatch => {
	const response = await axios.patch(
		`/order/deleteuserorder?id=${id}&userId=${userId}`
	);
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

export const deleteOrder = id => async dispatch => {
	const response = await axios.delete(`/order/deleteorder?id=${id}`);
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

export const updateOrder = (id, value) => async dispatch => {
	const response = await axios.patch(
		`/order/updateorder?id=${id}&value=${value}`
	);
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
