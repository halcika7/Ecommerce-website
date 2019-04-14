import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    brandData: {
        name: '',
        categories: []
    },
    allBrands: [],
    error: false,
    errorID: false,
    failedMessage: false,
    successMessage: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.BRAND_START] :
            updateObject(state, {
                ...initialState,
                loading: true
            }),
        [actionTypes.CLEAR_BRAND_STATE] :
            updateObject(state, {
                ...initialState
            }),
        [actionTypes.BRAND_FAILED] :
            updateObject(state, {
                failedMessage: action.failedMessage ? action.failedMessage : false,
                error: action.error ? action.error : false,
                errorID: action.errorID ? action.errorID : false,
                brandData: action.data ? action.data : initialState.brandData,
                loading: action.loading ? action.loading : false
            }),
        [actionTypes.BRAND_SUCCESS] :
            updateObject(state, {
                successMessage: action.successMessage,
                allCategoryIcons: action.categoryIcons ? action.categoryIcons : [],
                allBrands: action.brands ? action.brands : [],
                brandData: action.data ? action.data : initialState.brandData,
                loading: action.loading ? action.loading : false
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;