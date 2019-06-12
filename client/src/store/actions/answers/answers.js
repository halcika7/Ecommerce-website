import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addAnswer = (answerObj, callBack) => async dispatch => {
	dispatch({ type: actionTypes.ANSWER_START });

	const token = localStorage.jwtToken;

	const response = await axios.post('/answers/addanswer', answerObj, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.errors) {
		dispatch({
			type: actionTypes.ANSWER_FAILED,
			errors: response.data.errors,
			data: answerObj
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.ANSWER_FAILED,
			data: answerObj,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.ANSWER_SUCCESS,
			successMessage: response.data.successMessage
		});
	}
};

export const getAllAnswers = () => async dispatch => {
	dispatch({ type: actionTypes.ANSWER_START });

	const response = await axios.get('/answers/getallanswers');

	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.ANSWER_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.ANSWER_SUCCESS,
			answers: response.data.answers
		});
	}
};

export const getAnswer = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.ANSWER_START });
	const token = localStorage.jwtToken;

	const response = await axios.get('/answers/getanswer?id=' + id, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.ANSWER_FAILED,
			failedMessage: response.data.failedMessage,
			notFound: true
		});
	} else {
		dispatch({
			type: actionTypes.ANSWER_SUCCESS,
			data: response.data.answer
		});
	}
};

export const deleteAnswer = (id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.ANSWER_START });
	const token = localStorage.jwtToken;
	const response = await axios.delete('/answers/deleteanswer?id=' + id, {
		headers: { Authorization: token }
	});

	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}

	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.ANSWER_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.ANSWER_SUCCESS,
			successMessage: response.data.successMessage,
			answers: response.data.answers
		});
	}
};

export const updateAnswer = (answerObj, id, callBack) => async dispatch => {
	dispatch({ type: actionTypes.ANSWER_START });
	const obj = JSON.stringify(answerObj);
	const token = localStorage.jwtToken;

	const response = await axios.patch(
		`/answers/updateanswer?object=${obj}&id=${id}`,
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
			type: actionTypes.ANSWER_FAILED,
			data: answerObj,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.ANSWER_SUCCESS,
			successMessage: response.data.successMessage,
			data: response.data.answer
		});
	}
};
