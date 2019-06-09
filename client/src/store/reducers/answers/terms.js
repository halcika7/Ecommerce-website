import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	termData: {
		term: '',
		text: ''
	},
	terms: [],
	errors: {},
	failedMessage: false,
	successMessage: false,
	notFound: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.TERM_START]: updateObject(state, {
			...initialState,
			loading: true
		}),
		[actionTypes.TERM_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage ? action.failedMessage : false,
			errors: action.errors ? action.errors : false,
			notFound: action.notFound ? action.notFound : false,
			termData: action.data ? action.data : initialState.termData,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.TERM_SUCCESS]: updateObject(state, {
			successMessage: action.successMessage ? action.successMessage : false,
			termData: action.data ? action.data : initialState.termData,
			terms: action.terms ? action.terms : initialState.terms,
			loading: action.loading ? action.loading : false
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
