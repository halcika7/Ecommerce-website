import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	Users: [],
	SingleUser: {},
	errorID: false,
	errors: {},
	profilePicture: false,
	failedMessage: false,
	successMessage: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.USER_START]: updateObject(state, {
			loading: true
		}),
		[actionTypes.USER_SUCCESS]: updateObject(state, {
			Users: action.Users ? { ...action.Users } : state.Users,
			SingleUser: action.User ? action.User : state.SingleUser,
			successMessage: action.successMessage ? action.successMessage : false,
			profilePicture: action.photo ? action.photo : state.profilePicture,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.USER_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage ? action.failedMessage : false,
			errorID: action.errorID ? action.errorID : false,
			errors: action.errors ? action.errors : false,
			loading: action.loading ? action.loading : false
		}),
		default: state
	};
	return actions[action.type] || actions.default;
};

export default reducer;
