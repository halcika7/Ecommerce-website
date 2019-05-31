import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	products: [],
	brands: [],
	sizes: [],
	colors: [],
	graphics: [],
	hdds: [],
	rams: [],
	ssds: [],
	resolutions: [],
	memorys: [],
	displays: [],
	wifi: [],
	bluetooth: [],
	consoles: [],
	price: { min: 0, max: 0 },
	pages: { numberOfProducts: 0, numberOfPages: 0 },
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
			sizes: action.sizes ? action.sizes : state.sizes,
			colors: action.colors ? action.colors : state.colors,
			graphics: action.graphics ? action.graphics : state.graphics,
			hdds: action.hdds ? action.hdds : state.hdds,
			rams: action.rams ? action.rams : state.rams,
			ssds: action.ssds ? action.ssds : state.ssds,
			resolutions: action.resolutions ? action.resolutions : state.resolutions,
			memorys: action.memorys ? action.memorys : state.memorys,
			displays: action.displays ? action.displays : state.displays,
			wifi: action.wifi ? action.wifi : state.wifi,
			bluetooth: action.bluetooth ? action.bluetooth : state.bluetooth,
			consoles: action.consoles ? action.consoles : state.consoles,
			price: action.price ? action.price : state.price,
			pages: action.pages ? action.pages : state.pages,
			successMessage: action.successMessage ? action.successMessage : false,
			loading: action.loading ? action.loading : false,
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
