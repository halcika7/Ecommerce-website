import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	Roles: [],
	Role: {},
	errorId: false,
	failedMessage: false,
	successMessage: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.ROLE_START]: updateObject(state, {
			...initialState,
			loading: true
		}),
		[actionTypes.ROLE_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage,
			loading: action.loading ? action.loading : false,
			errorId: action.errorId ? action.errorId : false
		}),
		[actionTypes.ROLE_SUCCESS]: updateObject(state, {
			successMessage: action.successMessage,
			Role: action.role ? action.role : {},
			Roles: action.roles ? action.roles : {},
			loading: action.loading ? action.loading : false
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
