import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  numberOfProducts: 0,
  numberOfOrders: 0,
  numberOfActiveCoupons: 0,
  numberOfSoldProducts: 0,
  latestTransactions: [],
  bestSellingProducts: [],
  failedMessage: false,
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.DASHBOARD_START]: updateObject(state, {
      ...initialState
    }),
    [actionTypes.DASHBOARD_FAILED]: updateObject(state, {
      failedMessage: action.failedMessage ? action.failedMessage : false,
    }),
    [actionTypes.DASHBOARD_SUCCESS]: updateObject(state, {
      numberOfProducts: action.numberOfProducts ? action.numberOfProducts : 0,
      numberOfOrders: action.numberOfOrders ? action.numberOfOrders : 0,
      numberOfActiveCoupons: action.numberOfActiveCoupons ? action.numberOfActiveCoupons : 0,
      numberOfSoldProducts: action.numberOfSoldProducts ? action.numberOfSoldProducts : 0,
      latestTransactions: action.latestTransactions ? action.latestTransactions : [],
      bestSellingProducts: action.bestSellingProducts ? action.bestSellingProducts : [],
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
