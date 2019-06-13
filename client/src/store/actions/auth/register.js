import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const register = UserObj => async dispatch => {
	dispatch({ type: actionTypes.REGISTER_START });
	const response = await axios.post('/api/users/register', UserObj);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.REGISTER_FAILED,
			errors: {},
			failedMessage: response.data.failedMessage,
			User: UserObj
		});
	} else if (response.data.errors) {
		dispatch({
			type: actionTypes.REGISTER_FAILED,
			errors: response.data.errors,
			User: UserObj,
			failedMessage: false
		});
	} else {
		dispatch({
			type: actionTypes.REGISTER_SUCCESS,
			User: response.data.addNewUser,
			message: response.data.message
		});
	}
};

export const activateAccount = activationObject => async dispatch => {
	const response = await axios.post(
		'/api/users/activateaccount',
		activationObject
	);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.REGISTERACTIVATION_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.REGISTERACTIVATION_SUCCESS,
			successMessage: response.data.successMessage
		});
		setTimeout(() => {
			dispatch({ type: actionTypes.REGISTERACTIVATION_CLEAR });
		}, 8000);
	}
};

export const resendActivationLink = activationObject => async dispatch => {
	dispatch({ type: actionTypes.REGISTERACTIVATION_START });
	const response = await axios.post(
		'/api/users/resendactivateaccount',
		activationObject
	);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.REGISTERACTIVATION_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.REGISTERACTIVATION_SUCCESS,
			successMessage: response.data.successMessage
		});
		setTimeout(() => {
			dispatch({ type: actionTypes.REGISTERACTIVATION_CLEAR });
		}, 4000);
	}
};
