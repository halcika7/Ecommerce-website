import { combineReducers } from 'redux';
import loginReducer from './auth/login';
import registerReducer from './auth/register';
import resetPasswordReducer from './auth/resetpassword';
import resetPasswordEmailReducer from './auth/resetPasswordEmail';
import getAllUsersReducer from './auth/getUsers';
import permissionsReducer from './auth/permissions';
import userRolesReducer from './roles/userRoles';
import addUserReducer from './auth/addNewUser';

export const combinedReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    resetEmail: resetPasswordEmailReducer,
    resetPassword: resetPasswordReducer,
    allUsers: getAllUsersReducer,
    permissions: permissionsReducer,
    roles: userRolesReducer,
    addUser: addUserReducer
});