import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  errorName: '',
  successMessage: false,
  failedMessage: false
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.PRODUCT_FAILED]: updateObject(state, {
      errorName: action.errorName ? action.errorName : '',
      failedMessage: action.failedMessage ? action.failedMessage : false
    }),
    [actionTypes.PRODUCT_SUCCESS]: updateObject(state, {
      successMessage: action.successMessage ? action.successMessage : false
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
