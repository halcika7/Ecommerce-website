import * as actionTypes from '../actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getLoggedInUserPhoto } from '../index';

export const login = UserObj => async dispatch => {
	dispatch({ type: actionTypes.LOGIN_START });

	const response = await axios.post('/api/users/login', UserObj);

	if (response.data.errors) {
		dispatch({
			type: actionTypes.LOGIN_FAILED,
			errors: response.data.errors,
			UserInfo: UserObj,
			failedMessage: false
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.LOGIN_FAILED,
			errors: response.data.errors,
			UserInfo: UserObj,
			failedMessage: response.data.failedMessage
		});
	} else {
		const { token } = response.data;
		const { rememberMe } = response.data;

		localStorage.setItem('jwtToken', token);
		// Set Token to Auth Header
		// decode token
		const decoded = jwt_decode(token);

		dispatch(setCurrentUser(decoded, rememberMe, response.data.successMessage));
		dispatch(getLoggedInUserPhoto(decoded.id));
	}
};

export const setCurrentUser = (decoded, rememberMe, message = false) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		User: decoded,
		rememberMe,
		successMessage: message
	};
};

export const logoutUser = (callBack = null) => dispatch => {
	localStorage.removeItem('jwtToken');

	dispatch({
		type: actionTypes.LOGOUT,
		User: { role: { isAdmin: false } }
	});

	callBack('/authentication');
};
