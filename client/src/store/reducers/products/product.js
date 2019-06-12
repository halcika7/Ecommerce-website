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
	singleProduct: {},
	similarProducts: [],
	searchedProducts: [],
	products: [],
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
			featuredProducts: action.featuredProducts
				? action.featuredProducts
				: state.featuredProducts,
			topSellingProducts: action.topSellingProducts
				? action.topSellingProducts
				: state.topSellingProducts,
			newProducts: action.newProducts ? action.newProducts : state.newProducts,
			bannerProducts: action.bannerProducts
				? action.bannerProducts
				: state.bannerProducts,
			ourProducts: action.ourProducts ? action.ourProducts : state.ourProducts,
			singleProduct: action.singleProduct
				? action.singleProduct
				: state.singleProduct,
			similarProducts: action.similarProducts ? action.similarProducts : [],
			searchedProducts: action.searchedProducts
				? action.searchedProducts
				: state.searchedProducts,
			products: action.products ? action.products : state.products,
			dailyOffer: action.dailyOffer ? action.dailyOffer : state.dailyOffer,
			weeklyOffer: action.weeklyOffer ? action.weeklyOffer : state.weeklyOffer
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
