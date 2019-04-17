import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  categoryData: {
    name: "",
    icon: false,
    subcategories: []
  },
  allCategories: [],
  error: false,
  errorId: false,
  failedMessage: false,
  successMessage: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.CATEGORY_START]: updateObject(state, {
      ...initialState,
      loading: true
    }),
    [actionTypes.CLEAR_CATEGORY_STATE]: updateObject(state, {
      ...initialState
    }),
    [actionTypes.CATEGORY_SUCCESS]: updateObject(state, {
      successMessage: action.successMessage ? action.successMessage : false,
      allCategories: action.categories ? action.categories : [],
      categoryData: action.data ? action.data : initialState.categoryData,
      loading: action.loading ? action.loading : false
    }),
    [actionTypes.CATEGORY_FAILED]: updateObject(state, {
      failedMessage: action.failedMessage ? action.failedMessage : false,
      errorId: action.errorId ? action.errorId : false,
      error: action.error ? action.error : false,
      categoryData: action.data ? action.data : initialState.categoryData,
      loading: action.loading ? action.loading : false
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
