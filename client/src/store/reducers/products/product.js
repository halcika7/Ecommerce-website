import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  productData: {},
  errors: false,
  errorName: '',
  successMessage: false,
  failedMessage: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.PRODUCT_START] : updateObject(state, {
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
      loading: action.loading ? action.loading : false
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
