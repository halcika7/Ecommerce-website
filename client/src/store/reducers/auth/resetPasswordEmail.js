import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const resetPasswordEmailState = {
  email: "",
  errors: {
    email: ""
  },
  success: false,
  resetpasswordToken: null,
  successMessage: false,
  failedMessage: false
};

const reducer = (state = resetPasswordEmailState, action) => {
  const actions = {
    [actionTypes.RESETPASSWORDEMAIL_START]: updateObject(state, {
      ...resetPasswordEmailState,
      success: false,
      resetpasswordToken: null
    }),
    [actionTypes.RESETPASSWORDEMAIL_SUCCESS]: updateObject(state, {
      ...resetPasswordEmailState,
      success: true,
      resetpasswordToken: action.token,
      successMessage: action.successMessage
    }),
    [actionTypes.RESETPASSWORDEMAIL_FAILED]: updateObject(state, {
      email: action.email,
      errors: { ...action.errors },
      failedMessage: action.failedMessage,
      success: false,
      resetpasswordToken: null
    }),
    [actionTypes.RESETPASSWORDEMAIL_CLEAR]: updateObject(state, {
      ...resetPasswordEmailState
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
