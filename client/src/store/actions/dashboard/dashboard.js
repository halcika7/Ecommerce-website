import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const getDashboard = callBack => async dispatch => {
	dispatch({ type: actionTypes.DASHBOARD_START });
	const token = localStorage.jwtToken;
	const response = await axios.get('/dashboard/dashboard', {
		headers: { Authorization: token }
	});
	if (response.data.authenticationFailed) {
		dispatch(logoutUser(callBack));
	}
	if (response.data.successMessage) {
		dispatch({
			type: actionTypes.DASHBOARD_SUCCESS,
			numberOfSoldProducts: response.data.numberOfSoldProducts[0].n,
			bestSellingProducts: response.data.bestSellingProducts,
			numberOfOrders: response.data.numberOfOrders,
			numberOfActiveCoupons: response.data.numberOfActiveCoupons,
			numberOfProducts: response.data.numberOfProducts,
			latestTransactions: response.data.latestTransactions
		});
	} else {
		dispatch({
			type: actionTypes.DASHBOARD_FAILED,
			failedMessage: response.data.failedMessage
		});
	}
};
