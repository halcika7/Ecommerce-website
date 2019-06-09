import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addTerm = termObj => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });

	const response = await axios.post('/terms/addterm', termObj);

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

export const getTerm = id => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });

	const response = await axios.get('/terms/getterm?id=' + id);

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

export const deleteTerm = id => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const response = await axios.delete('/terms/deleteterm?id=' + id);

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

export const updateTerm = (termObj, id) => async dispatch => {
	dispatch({ type: actionTypes.TERM_START });
	const obj = JSON.stringify(termObj);

	const response = await axios.patch(
		`/answers/updateanswer?object=${obj}&id=${id}`
	);

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
