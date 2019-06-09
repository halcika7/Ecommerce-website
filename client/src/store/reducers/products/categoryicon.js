import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	name: '',
	allCategoryIcons: [],
	error: false,
	errorID: false,
	failedMessage: false,
	successMessage: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.CATEGORY_ICON_START]: updateObject(state, {
			...initialState,
			loading: true
		}),
		[actionTypes.CLEAR_CATEGORY_ICON_STATE]: updateObject(state, {
			...initialState
		}),
		[actionTypes.CATEGORY_ICON_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage ? action.failedMessage : false,
			error: action.error ? action.error : false,
			errorID: action.errorID ? action.errorID : false,
			name: action.name ? action.name : initialState.name,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.CATEGORY_ICON_SUCCESS]: updateObject(state, {
			successMessage: action.successMessage,
			allCategoryIcons: action.categoryIcons
				? action.categoryIcons
				: state.allCategoryIcons,
			name: action.name ? action.name : '',
			loading: action.loading ? action.loading : false
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
