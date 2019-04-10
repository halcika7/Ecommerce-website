import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    errors: {},
    loading: false,
    successMessage: false,
    failedMessage: false
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.ADD_NEW_USER_START] :
            updateObject(state, {
                ...initialState,
                loading: true
            }),
        [actionTypes.ADD_NEW_USER_FAILED] :
            updateObject(state, {
                ...initialState,
                errors: {...action.errors}
            }),
        [actionTypes.ADD_NEW_USER_SUCCESS] :
            updateObject(state, {
                ...initialState,
                successMessage: action.successMessage
            }),
        [actionTypes.USER_CLEAR] :
            updateObject(state, {
                ...initialState
            }),
        [actionTypes.UPDATE_USER_START] :
            updateObject(state, {
                ...initialState,
                loading: true
            }),
        [actionTypes.UPDATE_USER_SUCCESS] :
            updateObject(state, {
                ...initialState,
                successMessage: action.successMessage
            }),
        [actionTypes.UPDATE_USER_FAILED] :
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage
            }),
        [actionTypes.UPDATE_USER_ERROR] :
            updateObject(state, {
                ...initialState,
                errors: {...action.errors}
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;