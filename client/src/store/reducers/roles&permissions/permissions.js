import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialStatePermissions = {
	successMessage: false,
	failedMessage: false,
	permission: '',
	allPermissions: [],
	modelNames: [],
	error: false,
	loading: false
};

const reducer = (state = initialStatePermissions, action) => {
	const actions = {
		[actionTypes.PERMISSION_START]: updateObject(state, {
			...initialStatePermissions,
			loading: true
		}),
		[actionTypes.PERMISSION_SUCCESS]: updateObject(state, {
			...initialStatePermissions,
			modelNames: action.modelNames ? action.modelNames : state.modelNames,
			successMessage: action.successMessage ? action.successMessage : false,
			allPermissions: action.allPermissions ? action.allPermissions : false,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.PERMISSION_FAILED]: updateObject(state, {
			...initialStatePermissions,
			failedMessage: action.failedMessage ? action.failedMessage : false,
			permission: action.permission ? action.permission : '',
			error: action.error ? action.error : false,
			loading: action.loading ? action.loading : false
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
