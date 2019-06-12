import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addTerm = (termObj, callBack) => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const token = localStorage.jwtToken;

	const response = await axios.post('/terms/addterm', termObj, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.errors) {
		dispatch({
			type: actionTypes.TERM_FAILED,
			errors: response.data.errors,
			data: termObj
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.TERM_FAILED,
			data: termObj,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.TERM_SUCCESS,
			successMessage: response.data.successMessage
		});
	}
};

export const getAllTerms = () => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const response = await axios.get('/terms/getallterms');

	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.TERM_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.TERM_SUCCESS,
			terms: response.data.terms
		});
	}
};

export const getTerm = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const token = localStorage.jwtToken;

	const response = await axios.get('/terms/getterm?id=' + id, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.TERM_FAILED,
			failedMessage: response.data.failedMessage,
			notFound: true
		});
	} else {
		dispatch({
			type: actionTypes.TERM_SUCCESS,
			data: response.data.term
		});
	}
};

export const deleteTerm = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete(`/terms/deleteterm?id=${id}`, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.TERM_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.TERM_SUCCESS,
			successMessage: response.data.successMessage,
			terms: response.data.terms
		});
	}
};

export const updateTerm = (termObj, id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const obj = JSON.stringify(termObj);
	const token = localStorage.jwtToken;
	const response = await axios.patch(
		`/terms/updateterm?object=${obj}&id=${id}`,
		null,
		{
			headers: { Authorization: token }
		}
	);

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.TERM_FAILED,
			data: termObj,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.TERM_SUCCESS,
			successMessage: response.data.successMessage,
			data: response.data.term
		});
	}
};
