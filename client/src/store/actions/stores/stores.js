import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { returnStoresDataOnError } from '../../../helpers/stores';
import { logoutUser } from '../auth/login';

export const addStore = (formData, config, callBack) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const storeData = returnStoresDataOnError(formData);
	const token = localStorage.jwtToken;
	const configuration = {
		headers: { Authorization: token, ...config.headers }
	};
	const response = await axios.post(
		'/stores/addstore',
		formData,
		configuration
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			storeData,
			failedMessage: response.data.failedMessage
		});
	} else if (response.data.errors) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			storeData,
			errors: response.data.errors
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			successMessage: response.data.successMessage
		});
	}
};

export const getStores = callBack => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const token = localStorage.jwtToken;
	const response = await axios.get('/stores/getstores', {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			successMessage: response.data.successMessage,
			stores: response.data.stores
		});
	}
};

export const getStoresFront = () => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const response = await axios.get('/stores/getstoresfront');
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			successMessage: response.data.successMessage,
			stores: response.data.stores
		});
	}
};

export const getStore = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(`/stores/getstore?id=${id}`, {
		headers: { Authorization: token }
	});
	const options = { ...response.data.store };
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			failedMessage: response.data.failedMessage,
			notFound: true
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			storeData: { options }
		});
	}
};

export const getStoreContact = () => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const response = await axios.get('/stores/getstorecontact');
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			failedMessage: response.data.failedMessage,
			notFound: true
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			store: response.data.store
		});
	}
};

export const deleteStore = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete(`/stores/deletestore?id=${id}`, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			successMessage: response.data.successMessage,
			stores: response.data.stores
		});
	}
};

export const updateStore = (formData, config, callBack) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const token = localStorage.jwtToken;
	const storeData = returnStoresDataOnError(formData);
	const configuration = {
		headers: { Authorization: token, ...config.headers }
	};
	const response = await axios.patch('/stores/updatestore', formData, configuration);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			storeData,
			failedMessage: response.data.failedMessage
		});
	} else if (response.data.errors) {
		dispatch({
			type: actionTypes.STORE_FAILED,
			storeData,
			errors: response.data.errors
		});
	} else {
		const options = { ...response.data.store };
		dispatch({
			type: actionTypes.STORE_SUCCESS,
			successMessage: response.data.successMessage,
			storeData: { options }
		});
	}
};
