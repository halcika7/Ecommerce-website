import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialResetPasswordState = {
	password: '',
	password2: '',
	email: '',
	token: '',
	errors: {
		password: '',
		password2: '',
		expiredToken: false
	},
	successMessage: false,
	failedMessage: false,
	redirectTo: '/404'
};

const reducer = (state = initialResetPasswordState, action) => {
	const actions = {
		[actionTypes.RESETPASSWORD_START]: updateObject(state, {
			...initialResetPasswordState,
			...action.paswords
		}),
		[actionTypes.RESETPASSWORD_FAILED]: updateObject(state, {
			...action.passwords,
			errors: { ...action.errors },
			failedMessage: action.failedMessage
		}),
		[actionTypes.RESETPASSWORD_SUCCESS]: updateObject(state, {
			...initialResetPasswordState,
			successMessage: action.successMessage
		}),
		[actionTypes.RESETPASSWORD_CLEAR]: updateObject(state, {
			...initialResetPasswordState,
			redirectTo: '/authentication'
		}),
		[actionTypes.PROFILE_PASSWORD_UPDATE_SUCCESS]: updateObject(state, {
			...initialResetPasswordState,
			successMessage: action.successMessage
		}),
		[actionTypes.PROFILE_PASSWORD_UPDATE_FAILED]: updateObject(state, {
			...action.passwords,
			errors: { ...action.errors },
			failedMessage: action.failedMessage
		}),
		[actionTypes.PROFILE_PASSWORD_UPDATE_START]: updateObject(state, {
			...initialResetPasswordState
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
