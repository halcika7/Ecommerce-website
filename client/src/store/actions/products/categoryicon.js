import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addCategoryIcon = (name, callBack) => async dispatch => {
	dispatch({ type: actionTypes.CATEGORY_ICON_START });
	const token = localStorage.jwtToken;
	const response = await axios.post('/products/categoryicon/addcategoryicon', {name}, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.error) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			error: response.data.error,
			name
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			failedMessage: response.data.failedMessage,
			name
		});
	} else {
		dispatch({
			type: actionTypes.CATEGORY_ICON_SUCCESS,
			successMessage: response.data.successMessage
		});
		setTimeout(() => dispatch(clearStateIcons()), 4000);
	}
};

export const getAllCategoryIcons = callBack => async dispatch => {
	dispatch({ type: actionTypes.CATEGORY_ICON_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(
		'/products/categoryicon/getallcategoryicons', {
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.CATEGORY_ICON_SUCCESS,
			categoryIcons: response.data.categoryIcons
		});
	}
};

export const getCategoryIcon = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.CATEGORY_ICON_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(
		`/products/categoryicon/getcategoryicon?id=${id}`, {
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.error) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			errorID: response.data.error
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.CATEGORY_ICON_SUCCESS,
			name: response.data.icon.name
		});
	}
};

export const editCategoryIcon = (id, name, callBack) => async dispatch => {
	dispatch({ type: actionTypes.CATEGORY_ICON_START });
	const token = localStorage.jwtToken;
	const response = await axios.put(`/products/categoryicon/editcategoryicon`, {
		id,
		name
	}, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			failedMessage: response.data.failedMessage,
			name,
			loading: true
		});
		setTimeout(() => dispatch(getCategoryIcon(id)), 4000);
	}
	if (response.data.error) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			error: response.data.error,
			name
		});
	} else {
		dispatch({
			type: actionTypes.CATEGORY_ICON_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
		setTimeout(() => dispatch(getCategoryIcon(id)), 4000);
	}
};

export const deleteCategoryIcon = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.CATEGORY_ICON_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete(
		`/products/categoryicon/deletecategoryicon?id=${id}`, {
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			failedMessage: response.data.failedMessage,
			loading: true
		});
		setTimeout(() => dispatch(getAllCategoryIcons()), 4000);
	} else {
		dispatch({
			type: actionTypes.CATEGORY_ICON_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
		setTimeout(() => dispatch(getAllCategoryIcons()), 4000);
	}
};

export const deleteManyCategoryIcons = (ids, callBack) => async dispatch => {
	const token = localStorage.jwtToken;
	let queryString = '/products/categoryicon/deletemanycategoryicons?';
	ids.forEach((id, index) => {
		queryString += `id${index}=${id}&`;
	});
	dispatch({ type: actionTypes.CATEGORY_ICON_START });
	const response = await axios.delete(queryString, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.CATEGORY_ICON_FAILED,
			failedMessage: response.data.failedMessage,
			loading: true
		});
	} else {
		dispatch({
			type: actionTypes.CATEGORY_ICON_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	setTimeout(() => dispatch(getAllCategoryIcons()), 4000);
};

export const clearStateIcons = () => async dispatch =>
	dispatch({ type: actionTypes.CLEAR_CATEGORY_ICON_STATE });
