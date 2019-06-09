import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	orders: [],
	userOrders: [],
	order: {},
	failedMessage: false,
	successMessage: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	const actions = {
		[actionTypes.ORDER_START]: updateObject(state, {
			...initialState,
			loading: true
		}),
		[actionTypes.ORDER_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage ? action.failedMessage : false,
			loading: false
		}),
		[actionTypes.ORDER_SUCCESS]: updateObject(state, {
			successMessage: action.successMessage ? action.successMessage : false,
			userOrders: action.userOrders ? action.userOrders : state.userOrders,
			orders: action.orders ? action.orders : state.orders,
			order: action.order ? action.order : state.order,
			loading: false
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
