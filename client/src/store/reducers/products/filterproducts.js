import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	products: [],
	brands: [],
	colors: [],
	minPrice: 0,
	maxPrice: 0,
	successMessage: false,
	failedMessage: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.FILTER_PRODUCT_START]: updateObject(state, {
			loading: true
		}),
		[actionTypes.FILTER_PRODUCT_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage ? action.failedMessage : false,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.FILTER_PRODUCT_SUCCESS]: updateObject(state, {
            products: action.products ? action.products : state.products,
            brands: action.brands ? action.brands : state.brands,
            colors: action.colors ? action.colors : state.colors,
            minPrice: action.minPrice ? action.minPrice : state.minPrice,
            maxPrice: action.maxPrice ? action.maxPrice : state.maxPrice,
			successMessage: action.successMessage ? action.successMessage : false,
			loading: action.loading ? action.loading : false,
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
