import * as actionTypes from "../actionTypes";
import axios from "axios";
import { returnStoresDataOnError } from '../../../helpers/stores';

export const addStore = (formData, config) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
    const storeData = returnStoresDataOnError(formData);
	const response = await axios.post('/stores/addstore',formData,config);
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

export const getStores = () => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const response = await axios.get('/stores/getstores');
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

export const getStore = (id) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
    const response = await axios.get('/stores/getstore?id=' + id);
    const options = {...response.data.store};
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.STORE_FAILED,
            failedMessage: response.data.failedMessage,
            notFound: true
		});
	} else {
		dispatch({
			type: actionTypes.STORE_SUCCESS,
            storeData: {options}
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

export const deleteStore = (id) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
	const response = await axios.delete('/stores/deletestore?id=' + id);
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

export const updateStore = (formData, config) => async dispatch => {
	dispatch({ type: actionTypes.STORE_START });
    const storeData = returnStoresDataOnError(formData);
	const response = await axios.patch('/stores/updatestore',formData,config);
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
        const options = {...response.data.store};
		dispatch({
			type: actionTypes.STORE_SUCCESS,
            successMessage: response.data.successMessage,
            storeData: {options}
		});
	}
};
