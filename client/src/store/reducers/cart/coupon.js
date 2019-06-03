import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  couponData: {},
  errors: {},
  coupons: [],
  failedMessage: false,
  successMessage: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.COUPON_START]: updateObject(state, {
      ...initialState,
      loading: true
    }),
    [actionTypes.COUPON_FAILED]: updateObject(state, {
      failedMessage: action.failedMessage ? action.failedMessage : false,
      errors: action.errors ? action.errors : {},
      couponData: action.couponData ? action.couponData : state.couponData,
      loading: false
    }),
    [actionTypes.COUPON_SUCCESS]: updateObject(state, {
      successMessage: action.successMessage ? action.successMessage : false,
      coupons: action.coupons ? action.coupons : state.coupons,
      loading:false
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
