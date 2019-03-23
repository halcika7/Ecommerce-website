import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialStatePermissions = {
    successMessage: false,
    failedMessage: false,
    permission: '',
    allPermissions: [],
    loading: false
}

const reducer = (state = initialStatePermissions, action) => {
    const actions = {
        [actionTypes.PERMISSION_START] :
            updateObject(state, {
                ...initialStatePermissions,
                loading: true
            }),
        [actionTypes.NEW_PERMISSION_SUCCESS] : 
            updateObject(state, {
                ...initialStatePermissions,
                successMessage: action.successMessage,
                loading: true
            }),
        [actionTypes.NEW_PERMISSION_FAILED] : 
            updateObject(state, {
                ...initialStatePermissions,
                failedMessage: action.failedMessage,
                permission: action.permission,
                loading: true
            }),
        [actionTypes.GET_ALL_PERMISSIONS_SUCCESS] : 
            updateObject(state, {
                ...initialStatePermissions,
                allPermissions: action.allPermissions,
                loding: false
            }),
        [actionTypes.GET_ALL_PERMISSIONS_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage,
                loading: false
            }),
        [actionTypes.DELETE_PERMISSION_SUCCESS] :
            updateObject(state, {
                successMessage: action.successMessage
            }),
        [actionTypes.DELETE_PERMISSION_FAILED] :
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;