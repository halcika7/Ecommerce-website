import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	productData: {},
	dailyOffer: [],
	weeklyOffer: [],
	featuredProducts: [],
	topSellingProducts: [],
	newProducts: [],
	bannerProducts: [],
	ourProducts: [],
	errors: false,
	errorName: '',
	successMessage: false,
	failedMessage: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.PRODUCT_START]: updateObject(state, {
			...initialState,
			loading: true
		}),
		[actionTypes.PRODUCT_FAILED]: updateObject(state, {
			errorName: action.errorName ? action.errorName : '',
			failedMessage: action.failedMessage ? action.failedMessage : false,
			productData: action.productData ? action.productData : {},
			errors: action.errors ? action.errors : false,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.PRODUCT_SUCCESS]: updateObject(state, {
			successMessage: action.successMessage ? action.successMessage : false,
			loading: action.loading ? action.loading : false,
			featuredProducts: action.featuredProducts ? action.featuredProducts : [],
			topSellingProducts: action.topSellingProducts
				? action.topSellingProducts
				: [],
			newProducts: action.newProducts ? action.newProducts : [],
			bannerProducts: action.bannerProducts ? action.bannerProducts : [],
			ourProducts: action.ourProducts ? action.ourProducts : [],
			dailyOffer: action.dailyOffer ? action.dailyOffer : [],
			weeklyOffer: action.weeklyOffer ? action.weeklyOffer : []
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
