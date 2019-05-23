import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../helpers/updateObject";

const initialState = {
  answerData: {
    question: "",
    answer: ""
  },
  answers: [],
  errors: {},
  failedMessage: false,
  successMessage: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  const actions = {
    [actionTypes.ANSWER_START]: updateObject(state, {
      ...initialState,
      loading: true
    }),
    [actionTypes.ANSWER_FAILED]: updateObject(state, {
      failedMessage: action.failedMessage ? action.failedMessage : false,
      errors: action.errors ? action.errors : false,
      answerData: action.data ? action.data : initialState.answerData,
      loading: action.loading ? action.loading : false
    }),
    [actionTypes.ANSWER_SUCCESS]: updateObject(state, {
      successMessage: action.successMessage ? action.successMessage : false,
      answerData: action.data ? action.data : initialState.answerData,
      answers: action.answers ? action.answers : initialState.answers,
      loading: action.loading ? action.loading : false
    }),
    default: state
  };

  return actions[action.type] || actions.default;
};

export default reducer;
