import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  storeData: {},
  stores:[],
  store: {},
  errors: {},
  failedMessage: false,
  successMessage: false,
  notFound: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.STORE_START]: updateObject(state, {
      ...initialState,
      loading: true
    }),
    [actionTypes.STORE_FAILED]: updateObject(state, {
      failedMessage: action.failedMessage ? action.failedMessage : false,
      errors: action.errors ? action.errors : {},
      notFound: action.notFound ? action.notFound : false,
      storeData: action.storeData ? action.storeData : initialState.storeData,
      loading: action.loading ? action.loading : false
    }),
    [actionTypes.STORE_SUCCESS]: updateObject(state, {
      successMessage: action.successMessage ? action.successMessage : false,
      storeData: action.storeData ? action.storeData : initialState.storeData,
      store: action.store ? action.store : initialState.store,
      stores: action.stores ? action.stores : initialState.stores,
      loading: action.loading ? action.loading : false
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
