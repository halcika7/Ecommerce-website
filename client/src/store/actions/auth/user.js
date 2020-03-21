import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../index';

export const getAllUsers = callBack => async dispatch => {
	dispatch({ type: actionTypes.USER_START });
	const token = localStorage.jwtToken;
	const response = await axios.get('/api/users/allusers', {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.USER_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({ type: actionTypes.USER_SUCCESS, Users: response.data.users });
	}
};

export const getSingleUser = (
	id,
	id2 = false,
	profile = false,
	callBack
) => async dispatch => {
	dispatch({ type: actionTypes.USER_START });
	const token = localStorage.jwtToken;
	const response = await axios.get(
		`/api/users/singleuser?id=${id}&id2=${id2}&profile=${profile}`,
		{
			headers: { Authorization: token }
		}
	);
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.error) {
		dispatch({ type: actionTypes.USER_FAILED, errorID: response.data.error });
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.USER_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({ type: actionTypes.USER_SUCCESS, User: response.data.user });
	}
	dispatch(getLoggedInUserPhoto(id2))
};

export const deleteUser = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.USER_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete('/api/users/deleteuser?id=' + id, {
		headers: { Authorization: token }
	});
	if(response.data.authenticationFailed) {
		dispatch(logoutUser(callBack))
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.USER_FAILED,
			failedMessage: response.data.failedMessage,
			loading: true
		});
	} else {
		dispatch({
			type: actionTypes.USER_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	dispatch(getAllUsers(callBack))
};

export const getLoggedInUserPhoto = id => async dispatch => {
	const response = await axios.get('/api/users/getuserphoto?id=' + id);
	if (response.data.failedMessage) {
		dispatch({ type: actionTypes.USER_FAILED });
	} else {
		dispatch({
			type: actionTypes.USER_SUCCESS,
			photo: response.data.profilePicture
		});
	}
};

export const addNewUser = (userData, callBack) => async dispatch => {
	dispatch({ type: actionTypes.USER_START });
	const token = localStorage.jwtToken;
	const response = await axios.post('/api/users/adduser', userData, {
		headers: { Authorization: token }
	});
	console.log(response.data)
	if(response.data.authenticationFailed) {
		dispatch(logoutUser, callBack);
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.USER_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
	if (response.data.errors) {
		dispatch({ type: actionTypes.USER_FAILED, errors: response.data.errors });
	} else {
		dispatch({
			type: actionTypes.USER_SUCCESS,
			successMessage: response.data.successMessage
		});
	}
};

export const updateUser = (userData, callBack) => async dispatch => {
	dispatch({ type: actionTypes.USER_START });
	const token = localStorage.jwtToken;
	const response = await axios.patch('/api/users/updateuser', userData, {
		headers: { Authorization: token }
	});
	if(response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.errors) {
		dispatch({ type: actionTypes.USER_FAILED, errors: response.data.errors });
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.USER_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.USER_SUCCESS,
			successMessage: response.data.successMessage
		});
		dispatch(getSingleUser(userData.id, false, false, callBack));
		dispatch(getLoggedInUserPhoto(userData.id));
	}
};
// nisam odradio
export const userUpdateProfilePicture = (
	formData,
	config,
	id, 
	callBack
) => async dispatch => {
	dispatch({ type: actionTypes.USER_START });
	const token = localStorage.jwtToken;
	const configuration = { headers: { Authorization: token, ...config.headers } };
	const response = await axios.put(
		'/api/users/updateprofilepicture',
		formData,
		configuration
	);
	console.log(callBack)
	if(response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.USER_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.USER_SUCCESS,
			successMessage: response.data.successMessage
		});
		dispatch(getSingleUser(id,false, false, callBack));
		dispatch(getLoggedInUserPhoto(id));
	}
};
