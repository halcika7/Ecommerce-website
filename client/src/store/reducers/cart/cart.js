import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  cartItems: [],
  coupon: {},
  saveForLaterItems: [],
  totals: {},
  inputs: {},
  errors: {firstName: '', lastName: '', email: '', telephone: '', country: '', address: '', city: '', zip: '', products: [], coupon: {}},
  failedMessage: false,
  successMessage: false,
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.CART_START]: updateObject(state, {
      ...initialState,
    }),
    [actionTypes.CART_FAILED]: updateObject(state, {
      failedMessage: action.failedMessage ? action.failedMessage : false,
      errors: action.errors ? {...initialState.errors,...action.errors} : initialState.errors,
      cartItems: action.cartItems ? action.cartItems : state.cartItems,
      inputs: action.inputs ? action.inputs : {},
      saveForLaterItems: action.saveForLaterItems ? action.saveForLaterItems : state.saveForLaterItems,
      totals: action.totals ? action.totals : state.totals,
    }),
    [actionTypes.CART_SUCCESS]: updateObject(state, {
      successMessage: action.successMessage ? action.successMessage : false,
      cartItems: action.cartItems ? action.cartItems : state.cartItems,
      coupon: action.coupon ? action.coupon : state.coupon,
      saveForLaterItems: action.saveForLaterItems ? action.saveForLaterItems : state.saveForLaterItems,
      totals: action.totals ? action.totals : state.totals,
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
