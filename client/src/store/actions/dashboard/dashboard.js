import * as actionTypes from "../actionTypes";
import axios from "axios";

export const getDashboard = () => async dispatch => {
    dispatch({  type: actionTypes.DASHBOARD_START });
    const response = await axios.get('/dashboard/dashboard');
    if(response.data.successMessage) {
        dispatch({  
            type: actionTypes.DASHBOARD_SUCCESS,
            numberOfSoldProducts: response.data.numberOfSoldProducts[0].n, 
            bestSellingProducts: response.data.bestSellingProducts,
            numberOfOrders: response.data.numberOfOrders,
            numberOfActiveCoupons: response.data.numberOfActiveCoupons,
            numberOfProducts: response.data.numberOfProducts,
            latestTransactions: response.data.latestTransactions
        });
    }else {
        dispatch({  type: actionTypes.DASHBOARD_FAILED, failedMessage: response.data.failedMessage});
    }
};
