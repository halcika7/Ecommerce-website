import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addNewPermission = (permission, callBack) => async dispatch => {
	dispatch({ type: actionTypes.PERMISSION_START });
	const token = localStorage.jwtToken;
	const response = await axios.post(
		'/rolespermissions/permissions/addpermission',
		{ permission },
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PERMISSION_FAILED,
			failedMessage: response.data.failedMessage,
			permission,
			loading: true
		});
	} else {
		dispatch({
			type: actionTypes.PERMISSION_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	setTimeout(() => dispatch(getAllModelNames(callBack)), 4000);
};

export const getAllPermissions = callBack => async dispatch => {
	dispatch({ type: actionTypes.PERMISSION_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(
		'/rolespermissions/permissions/getallpermissions',
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PERMISSION_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.PERMISSION_SUCCESS,
			allPermissions: response.data.permissions
		});
	}
};

export const getAllModelNames = callBack => async dispatch => {
	dispatch({ type: actionTypes.PERMISSION_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(
		'/rolespermissions/permissions/getallmodelnames',
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.error) {
		dispatch({
			type: actionTypes.PERMISSION_FAILED,
			error: response.data.error
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PERMISSION_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.PERMISSION_SUCCESS,
			modelNames: response.data.names,
			loading: false
		});
	}
};

export const deletePermission = (permission, callBack) => async dispatch => {
	dispatch({ type: actionTypes.PERMISSION_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete(
		`/rolespermissions/permissions/deletepermission?permission=${permission}`,
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PERMISSION_FAILED,
			failedMessage: response.data.failedMessage,
			loading: true
		});
	} else {
		dispatch({
			type: actionTypes.PERMISSION_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	setTimeout(() => {
		dispatch(getAllPermissions(callBack));
	}, 4000);
};

export const deleteManyPermissions = (
	permissions,
	callBack
) => async dispatch => {
	const token = localStorage.jwtToken;
	let queryString = '/rolespermissions/permissions/deletemanypermissions?';
	permissions.forEach((permission, index) => {
		queryString += `permission${index}=${permission}&`;
	});
	dispatch({ type: actionTypes.PERMISSION_START });
	const response = await axios.delete(queryString, {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PERMISSION_FAILED,
			failedMessage: response.data.failedMessage,
			loading: true
		});
	} else {
		dispatch({
			type: actionTypes.PERMISSION_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	setTimeout(() => {
		dispatch(getAllPermissions(callBack));
	}, 4000);
};
