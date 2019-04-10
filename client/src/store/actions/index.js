export {
    login,
    setCurrentUser,
    logoutUser,
    userUpdateProfilePicture
} from './auth/login';
export {
    register,
    activateAccount,
    resendActivationLink
} from './auth/register';

export {
    resetUserPasswordEmail
} from './auth/resetPasswordEmail';

export {
    resetPassword,
    resetState,
    updatePassword
} from './auth/resetpassword';

export {
    getAllUsers,
    getSingleUser,
    deleteUser,
    getLoggedInUserPhoto
} from './auth/getUsers';

export { 
    addNewPermission,
    getAllPermissions,
    deletePermission,
    deleteAllPermissions
 } from './auth/permissions';

export {
    addRole,
    getRoles,
    deleteAllUserRoles,
    deleteUserRole,
    getUserRole,
    updateUserRole
} from './roles/userRoles';

export {
    addNewUser,
    updateUser
} from './auth/addNewUser'