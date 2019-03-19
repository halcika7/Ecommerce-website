import { combineReducers } from 'redux';
import loginReducer from './auth/login';
import registerReducer from './auth/register';
import resetPasswordReducer from './auth/resetpassword';
import resetPasswordEmailReducer from './auth/resetPasswordEmail';
import getAllUsersReducer from './auth/getUsers';
import userRolesReducer from './roles/userRoles';

export const combinedReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    resetEmail: resetPasswordEmailReducer,
    resetPassword: resetPasswordReducer,
    allUsers: getAllUsersReducer,
    roles: userRolesReducer
});