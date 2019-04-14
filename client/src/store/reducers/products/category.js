import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    categoryData: {
        name: '',
        icon: false,
        subcategories: []
    },
    allCategories: [],
    error: false,
    errorId: false,
    failedMessage: false,
    successMessage: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.CATEGORY_START] :
            updateObject(state, {
                ...initialState,
                loading: true
            }),
        [actionTypes.CLEAR_CATEGORY_STATE] :
            updateObject(state, {
                ...initialState
            }),
        [actionTypes.ADD_EDIT_DELETE_CATEGORY_FAILED_OR_ERROR] :
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage ? action.failedMessage : false,
                error: action.error ? action.error : false,
                categoryData: action.data ? action.data : initialState.categoryData
            }),
        [actionTypes.ADD_EDIT_DELETE_CATEGORY_SUCESS] :
            updateObject(state, {
                ...initialState,
                successMessage: action.successMessage
            }),
        [actionTypes.GET_ALL_OR_SINGLE_CATEGORIES_SUCCESS] :
            updateObject(state, {
                ...initialState,
                allCategories: action.categories ? action.categories : [],
                categoryData: action.data ? action.data : initialState.categoryData
            }),
        [actionTypes.GET_ALL_OR_SINGLE_CATEGORIES_FAILED] :
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage,
                errorId: action.errorId ? action.errorId : false,
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;