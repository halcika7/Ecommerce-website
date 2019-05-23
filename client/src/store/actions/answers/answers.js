import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addAnswer = answerObj => async dispatch => {
	dispatch({ type: actionTypes.ANSWER_START });

    const response = await axios.post('/answers/addanswer', answerObj);

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
