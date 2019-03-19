import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialStateRegister = {
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {
        name: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    },
    message: false,
    activation: {
        successMessage: '',
        failedMessage: '',
        redirect: false
    }
}

const reducer = (state = initialStateRegister, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS : 
            return updateObject(state, {
                name: '',
                username: '',
                email: '',
                password: '',
                password2: '',
                errors: {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    password2: ''
                },
                message: action.message
            });
        case actionTypes.REGISTER_FAILED :
            return updateObject(state, {
                ...action.User,
                errors: {...action.errors}
            });
        case actionTypes.REGISTERACTIVATION_FAILED :
            return updateObject(state, {
                ...initialStateRegister,
                activation: {
                    ...initialStateRegister,
                    failedMessage: action.failedMessage
                }
            });
        case actionTypes.REGISTERACTIVATION_SUCCESS :
            return updateObject(state, {
                ...initialStateRegister,
                activation: {
                    ...initialStateRegister,
                    successMessage: action.successMessage,
                    redirect: false
                }
            });
        case actionTypes.REGISTERACTIVATION_CLEAR :
            return updateObject(state, {
                ...initialStateRegister,
                activation: {
                    ...initialStateRegister,
                    redirect: true
                }
            });
        default : 
            return state;
    }
}

export default reducer;